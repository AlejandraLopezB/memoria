const { db } = require("../pgAdaptor");
const { Date } = require("./customScalars");

const resolvers = {
    Date,
	Query: {
        persona: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE idpersona = $1`;
            const values = [args.idpersona];
            try {
                const res = await db.oneOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personas: async () => {
            const query = `SELECT * FROM Persona`;
            try {
                const res = await db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorCargo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE cargo = $1`;
            const values = [args.cargo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorCargoYPeriodo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE cargo = $1 AND periodo_legislativo = $2`;
            const values = [args.cargo, args.periodo_legislativo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorTipo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE tipo = $1`;
            const values = [args.tipo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorTipoYPeriodo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE tipo = $1 AND periodo_legislativo = $2`;
            const values = [args.tipo, args.periodo_legislativo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        periodosLegislativos: async () => {
            const query = `SELECT * FROM Periodo_Legislativo`;
            try {
                const res = await db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        periodoLegislativo: async (_, args) => {
            const query = `SELECT * FROM periodo_legislativo WHERE periodo_legislativo = $1`;
            const values = [args.periodo_legislativo];
            try {
                const res = await db.one(query, values);
                return res;
            } catch (err) {
                return err;
            }
        }
    },
    Persona: {
        periodoLegislativo(parent) {
            const query = `SELECT * FROM Periodo_Legislativo WHERE periodo_legislativo = ${ parent.periodo_legislativo }`;
            try {
                const res = db.oneOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        partidoPolitico(parent) {
            const query = `SELECT * FROM partido_politico WHERE idpartidopolitico = ${ parent.idpartidopolitico }`;
            try {
                const res = db.oneOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        }
    }
};

exports.resolvers = resolvers;
