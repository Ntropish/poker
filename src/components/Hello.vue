<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{Game}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      Game: null,
    }
  },
  apollo: {
    Game: {
      query: gql`{
        Game(id: "cj5pmeixz2n8d0187a67a51jo") {
          players {
            name
          }
          started
        }
      }`,
      subscribeToMore: {
        document: gql`subscription {
          Game {
            mutation
            node {
              started
            }
          }
        }`,
        variables() {
          return {
            id: this.id,
          }
        },
        updateQuery: (previousResult, {subscriptionData}) => {
          console.log(subscriptionData)
        }
      },
      variables() {
        return {
          id: this.id,
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
