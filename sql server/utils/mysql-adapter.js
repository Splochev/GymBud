const mysql = require('mysql');

module.exports = class MysqlAdapter {
    static pool = null;

    static init(host, port, db, user, password, poolLimit = 1) {
        this.pool = mysql.createPool(
            {
                host: host,
                port: port,
                database: db,
                user: user,
                password: password,
                connectionLimit: poolLimit,
                acquireTimeout: 30000,
                timezone: 'Z'
            }
        )
    }

    /**
     * @returns {mysql.Pool}
     */
    static getPool() {
        return this.pool;
    }

    /**
     * @param {string} query
     * @param {any[]} params
     * @returns {Promise<any[], Error>}
     */
    static query(query, params = []) {
        return new Promise((res, rej) => {
            this.getPool().query(query, params, (err, result) => {
                if (err) {
                    return rej(err);
                }

                res(result);
            });
        });
    }

    static transactionScope(callback) {
        return new Promise((res, rej) => {
            this.getPool().getConnection((ex, connection) => {
                if (ex) {
                    rej(ex);
                    console.error(ex);
                    return;
                }

                const cb = ((result, err) => {
                    connection.release();
                    if (err) {
                        console.error(err);
                        rej(err);
                    }

                    if (result) res(result);
                });

                connection.beginTransaction(async (ex) => {
                    if (ex) return connection.rollback(() => cb(null, ex));

                    try {
                        const transactionQuery = (query, params = []) => {
                            return new Promise((res, rej) => {
                                connection.query(query, params, (err, result) => {
                                    if (err) {
                                        return rej(err);
                                    }

                                    res(result);
                                });
                            });
                        };

                        await callback(transactionQuery);
                        connection.commit((ex) => {
                            if (ex) return connection.rollback(() => cb(null, ex));
                            cb({ success: true }, null);
                        });
                    } catch (ex) {
                        connection.rollback(() => cb(null, ex));
                    }
                });
            });
        });
    }

    /**
     * @param {string[]} queries
     * @param {any[]} params
     * @returns {Promise<any[], Error>}
     */
    static transactionQuery(queries, params = []) {
        return new Promise((res, rej) => {
            this.getPool().getConnection((ex, connection) => {
                if (ex) {
                    rej(ex);
                    return;
                }
                const cb = ((result, err) => {
                    connection.release();
                    if (err) {
                        rej(err);
                    }

                    if (result) res(result);
                });

                let queryResults = [];
                connection.beginTransaction((ex) => {
                    if (ex) return connection.rollback(() => cb(null, ex));
                    let error = false;
                    queries.forEach((query, indx) => {
                        connection.query(query, (ex, res) => {
                            if (error) return;
                            if (ex) {
                                error = true;
                                return connection.rollback(() => cb(null, ex));
                            }
                            queryResults.push(res);

                            if (indx == queries.length - 1) {
                                connection.commit((ex) => {
                                    if (ex) return connection.rollback(() => cb(null, ex));

                                    cb(queryResults, null);
                                })
                            }
                        });
                    });
                });
            });
        })
    }
}