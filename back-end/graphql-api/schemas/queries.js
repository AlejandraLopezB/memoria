// const { db } = require("../pgAdaptor");
// const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
// const { PersonaType, ComisionType, PartidoPoliticoType, PeriodoLegislativoType, SesionType, SesionLogType } = require("./types");

// const RootQuery = new GraphQLObjectType({
// 	name: "RootQueryType",
// 	type: "Query",
// 	fields: {
//     	persona: {
//       		type: PersonaType,
//       		args: { idpersona: { type: GraphQLID } },
//       		resolve(parentValue, args) {
//         		const query = `SELECT * FROM persona WHERE idpersona = $1`;
//         		const values = [args.idpersona];

//         	return db
//           		.one(query, values)
//           		.then(res => res)
//           		.catch(err => err);
//       		}
//     	},
// 		comision: {
// 			type: ComisionType,
// 			args: { idcomision: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				const query = `SELECT * FROM comision WHERE idcomision = $1`;
// 				const values = [args.idcomision];

// 				return db
// 				.one(query, values)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		partidopolitico: {
// 			type: PartidoPoliticoType,
// 			args: { idpartidopolitico: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				const query = `SELECT * FROM partido_politico WHERE idpartidopolitico = $1`;
// 				const values = [args.idpartidopolitico];

// 				return db
// 				.one(query, values)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		periodolegislativo: {
// 			type: PeriodoLegislativoType,
// 			args: { periodo_legislativo: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				const query = `SELECT * FROM periodo_legislativo WHERE periodo_legislativo = $1`;
// 				const values = [args.periodo_legislativo];

// 				return db
// 				.one(query, values)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		sesion: {
// 			type: SesionType,
// 			args: { idsesion: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				const query = `SELECT * FROM sesion WHERE idsesion = $1`;
// 				const values = [args.idsesion];

// 				return db
// 				.one(query, values)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		sesionlog: {
// 			type: SesionLogType,
// 			args: { idsesionlog: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				const query = `SELECT * FROM sesion_log WHERE idsesionlog = $1`;
// 				const values = [args.idsesionlog];

// 				return db
// 				.one(query, values)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		legisladores: {
// 			type: new GraphQLList(PersonaType),
// 			resolve(parentValue) {
// 				const query = `SELECT * FROM persona WHERE LOWER(tipo) like 'legislador' or LOWER(tipo) like 'legisladora'`;

// 				return db
// 				.any(query)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		diputados: {
// 			type: new GraphQLList(PersonaType),
// 			resolve(parentValue) {
// 				const query = `SELECT * FROM persona WHERE LOWER(cargo) like 'diputado' or LOWER(cargo) like 'diputada'`;

// 				return db
// 				.any(query)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		senadores: {
// 			type: new GraphQLList(PersonaType),
// 			resolve(parentValue) {
// 				const query = `SELECT * FROM persona WHERE LOWER(cargo) like 'senador' or LOWER(cargo) like 'senadora'`;

// 				return db
// 				.any(query)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
// 		legisladorespartidoperiodo: {
// 			type: new GraphQLList(PersonaType, PartidoPoliticoType, PeriodoLegislativoType),
// 			resolve(parentValue) {
// 				const query = `SELECT * 
// 				FROM ((partido_politico 
// 				inner join persona on partido_politico.idpartidopolitico = persona.idpartidopolitico) 
// 				inner join periodo_legislativo on persona.periodo_legislativo = periodo_legislativo.periodo_legislativo);`;

// 				return db
// 				.any(query)
// 				.then(res => res)
// 				.catch(err => err);
// 			}
// 		},
//   	}
// });

// exports.query = RootQuery;