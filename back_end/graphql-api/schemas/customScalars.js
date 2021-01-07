const { GraphQLDate } = require("graphql-iso-date")

const customScalars = {
    Date: GraphQLDate
};

exports.Date = customScalars.Date;