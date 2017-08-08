<template>
  <div class="hello" ref="leaver">
    <div v-if="Game && !Game.started">
      <button>Start Game</button>
      <button @click="leaveGame">Leave Game</button>
      <button @click="joinGame">Join Game</button>
      
      <h3>Players</h3>
      <ul>
          <li v-for="player in Game.players" :key="player.id">
              {{player.name}}
          </li>
      </ul>
    </div>

    <game-table v-if="Game && Game.started" :Game="Game">

    </game-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import vm from '../main.js'
import Game from './Game.vue'
console.log(vm)

export default {
  name: 'lobby',
  components: {
    'game-table': Game
  },
  data () {
    return {
      Game: null,
      gameId: 'cj5pmeixz2n8d0187a67a51jo',
      playerId: 'cj5pu8lii2u9q0187h0xa0bq3'
    }
  },
  mounted() {
    // this.joinGame()
    // window.onbeforeunload = () => {
    //   this.leaveGame()
    // }
  },
  methods: {
    leaveGame() {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $gameId: ID!, $rando: Int) {
          removeFromRoster(playersPlayerId: $id, playingGameId: $gameId) {
            playersPlayer {
              name
            }
          }
          updateGame(id: $gameId, bump: $rando) {
            creator {
              name
            }
          }        
        }`,
        variables: {
          id: this.playerId,
          gameId: this.gameId,
          rando: Math.floor(Math.random() * 999999999)
        },
      })
    },
    joinGame() {
      this.$apollo.mutate({
        mutation: gql`mutation ($id: ID!, $gameId: ID!, $rando: Int) {
          addToRoster(playersPlayerId: $id, playingGameId: $gameId) {
            playersPlayer {
              name
            }
          }
          updateGame(id: $gameId, bump: $rando) {
            creator {
              name
            }
          } 
        }`,
        variables: {
          id: this.playerId,
          gameId: this.gameId,
          rando: Math.floor(Math.random() * 999999999)
        },
      })
    },
    bumpGame() {
      this.$apollo.mutate({
        mutation: gql`mutation ($gameId: ID!, $rando: Int) {
          updateGame(id: $gameId, bump: $rando) {}
        }`,
        variables: {
          gameId: this.gameId,
          rando: Math.random()
        },
      })
    }
  },
  apollo: {
    Game: {
      query: gql`{
        Game(id: "cj5pmeixz2n8d0187a67a51jo") {
          players {
            name
            id
          }
          creator {
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
              players {
                name
                id
              }
            }
          }
        }`,
        variables() {
          return {
            id: this.id,
          }
        },
        updateQuery: (previousResult, {subscriptionData}) => {
          const newGame = subscriptionData.data.Game.node
          this.Game = Object.assign({}, previousResult.Game, newGame)
          console.log('updated game:', this.Game)
          return {Game: this.Game}
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
