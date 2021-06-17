<template>
  <div class="border row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group"
                 v-model="listPlayers"
                 group="players"
                 @change="log">
        <div class="list-group-item"
             v-for="(element) in listPlayers"
             :key="element.id">
          {{ element.id }} - {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <div class="row flight-wrapper" v-for="(flight, fIndex) in listFlights" :key="fIndex">
        <div class="col-12 party-wrapper" v-for="(party, pIndex) in flight.parties" :key="pIndex">
          <div class="row party-header">
            <div class="col-6 left">
              {{ 'PartyId: ' + party.id }}
            </div>
          </div>

          <div class="row">
            <draggable class="col-12"
                       :data-max="party.max"
                       :list="party.players"
                       @change="log"
                       ghost-class="ghost-class"
                       group="players">
              <div
                class="list-group-item"
                v-for="(element, index) in party.players"
                :data-id="fIndex+'-'+pIndex+'-'+index"
                :class="{
                    'free': element.id <= 0,
                    'item': element.id > 0,
                    'dragover': dragoverPlayerId === element.id
                }"
                :key="element.id">
                <draggable
                  :list="replaceList"
                  group="players"
                  @change="onChange(fIndex, pIndex, index)"
                  @dragover.native="onDragenter(element.id)"
                  @drop.native="onDragleave"
                  @dragleave.native="onDragleave">
                  {{ fIndex + '-' + pIndex + '-' + index }} {{ element.name }}
                </draggable>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "demoDraggable",
  components: {
    draggable
  },
  mounted() {
  },
  data() {
    return {
      replaceList: [],
      dragoverPlayerId: null,
      selectedMatch: {},
      list2Group: {
        name: 'players',
        pull() {
        },
        put(evt) {
          console.log(evt);
          // let el$ = $(evt.el).find('.list-group-item');
          // return el$.length < $(evt.el).data('max')
        }
      },
      listPlayers: [
        {name: "John", id: 1},
        {name: "Joao", id: 2},
        {name: "Jean", id: 3},
        {name: "Gerard", id: 4}
      ],
      listFlights: [
        {
          id: 1,
          parties: [{
            id: 1,
            max: 3,
            players: [
              {name: "Jack", id: 5, extra: {foo: 'bar1'}},
              {name: "Free", id: -1},
              {name: "Jones", id: 6},
              {name: "Anny", id: 7},
            ]
          }],
        },
        {
          id: 2,
          parties: [{
            id: 2,
            max: 5,
            players: [
              {name: "Bob", id: 8, extra: {foo: 'bar2'}},
              {name: "Finley", id: 9},
              {name: "Frank", id: 10},
              {name: "Flash", id: 11},
              {name: "Finish", id: 12, extra: {foo: 'bar3'}},
            ]
          }],
        },
      ]
    };
  },
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    // TODO pIndex, fIndex
    onChange(fIndex, pIndex, index) {
      console.log('replace', index);
      this.$set(this.listFlights[fIndex]['parties'][pIndex]['players'], index, this.replaceList.pop())
    },
    onDragenter(index) {
      this.dragoverPlayerId = index
    },
    onDragleave() {
      this.dragoverPlayerId = null
    }
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
.list-group-item {
  &.free {
    border: 2px dotted #333;
  }
}

.ghost-class {
  background-color: antiquewhite !important;
}

.ghost-class span {
  display: none;
}

.list-group-item .list-group-item {
  display: none;
}

.list-group-item.dragover {
  background-color: antiquewhite !important;
}
</style>
