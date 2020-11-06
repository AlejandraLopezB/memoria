const { gql } = require('apollo-server');

const typeDefs = gql`

	scalar Date

	type Query {
		# persona(idpersona: ID!): Persona
		# personas: [Persona]
		legisladores(periodo: ID!): [Persona]
		# personasPorCargo(cargo: String!): [Persona]
		# personasPorTipo(tipo: String!): [Persona]
		# periodosLegislativos: [PeriodoLegislativo]
		# periodoLegislativo(periodo_legislativo: ID!): PeriodoLegislativo
		# comision(idcomision: ID!): Comision
		sesionesPorAno(ano: Int!): [Sesion]
		sesionesPorComisionYAno(idcomision: ID!, ano: Int!): [Sesion]
		# sesionesPorComisionYPeriodo(idcomision: ID!, periodo_legislativo: ID!): [Sesion]
		# partidoPorPeriodo: [PartidoPorPeriodo]
		personaPorPartidoYPeriodo: [PersonaPorPartidoYPeriodo]
		comisiones: [Comision]
	}
	
	type Persona {
		idpersona: ID! 
		nombre: String
		genero: String
		fecha_nacimiento: Date
		cargo: String
		organizacion: String
		tipo: String
	}

	type PeriodoLegislativo {
		periodo_legislativo: ID!
		fecha_inicio: Date
		fecha_fin: Date
		numero_romano: String
	}

	type PartidoPolitico {
		idpartidopolitico: ID!
		nombre: String
		fecha_inicio: Date
		fecha_fin: Date
		activo: Boolean
	}

	type Comision {
		idcomision: ID!
		nombre: String
		tipo: String
		sesiones: [Sesion]
	}

	type Sesion {
		idsesion: ID!
		fecha: Date
		documento: String
		idcomision: ID!
		comision: Comision
		numero_sesion: Int!
		periodo_legislativo: ID!
		periodoLegislativo: PeriodoLegislativo
		sesionLog: [SesionLog]
	}

	type SesionLog {
		idsesionlog: ID!
		idsesion: ID!
		idpersona: ID
		personas: [Persona]
		asistente: Boolean
		expositor: Boolean
	}

	type PartidoPorPeriodo {
		idpartidoporperiodo: ID!
		idpartidopolitico: ID!
		partidoPolitico: PartidoPolitico
		periodo_legislativo: ID!
		periodoLegislativo: PeriodoLegislativo
		alineamiento_politico: String
		grupo_politico: String
	}

	type PersonaPorPartidoYPeriodo {
		idpersonaporpartidoyperiodo: ID!
		idpersona: ID!
		persona: Persona
		idpartidoporperiodo: ID!
		partidoPorPeriodo: PartidoPorPeriodo
		cargo: String
	}
`;

exports.typeDefs = typeDefs;
