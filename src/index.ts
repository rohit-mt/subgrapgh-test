import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String
  }
`;

const resolvers = {
  Query: {
    me(_: any, __: any, ctx: any) {
      console.log(ctx.requestId);
      return { id: "1", username: "@ava" };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context: async ({ req }) => {
    let requestId = req.header("X-Request-ID");
    return { requestId };
  },
});

server.listen(5001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
