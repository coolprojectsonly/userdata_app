import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import axios from "axios";

const app = express();
app.use(cors());
// Define the User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    // address: { type: GraphQLObjectType },
    // street: { type: GraphQLString },
  }),
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return response.data;
        } catch (error) {
          throw new Error("Unable to fetch users");
        }
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${args.id}`
          );
          return response.data;
        } catch (error) {
          throw new Error("User not found");
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);

const url = "http://localhost:5000/graphql";

app.get("/api/data", (req, res) => {
  const selectedOption = req.query.selectedOption;

  const query = `
{
  users {
   ${selectedOption}
   
  }
}
`;
  axios
    .post(url, { query })
    .then((response) => {
      res.json({ data: response.data.data });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(5000, () => {
  console.log(`Hello from server`);
});
