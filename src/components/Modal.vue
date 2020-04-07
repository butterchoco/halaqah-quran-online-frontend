<template>
  <div class="modal-container">
    <div class="modal-overlay">
      <div class="modal">
        <div class="close-btn" @click="close()">x</div>
        <div class="modal-header">
          <h3 class="header-title" :class="[isDanger ? 'red' : '']">Joko Anwar</h3>
        </div>
        <div class="modal-content">
          <div class="top">
            <div class="col v-center" v-for="(data, index) in dataModal.report" :key="index">
              <h3 class="title">{{data.content}}</h3>
              <p class="description">{{ data.title }}</p>
            </div>
          </div>
          <div class="bottom">{{ dataModal.note }}</div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    dataModal: Object,
    isDanger: Boolean
  },
  methods: {
    close() {
      this.$emit("exit", true);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  .modal-overlay {
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.1);
  }

  .modal {
    position: absolute;
    min-width: 100px;
    min-height: 100px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    padding: $gap-m-2;

    .modal-header {
      text-align: left;
    }

    .modal-content {
      flex: 1;
      width: 100%;

      p {
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .top {
        margin-top: $gap-m-2;
        display: grid;
        grid-template-columns: repeat(3, 33%);

        .col {
          .description {
            margin: $gap-sm-1;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }

    .close-btn {
      float: right;
      margin: 0 $gap-sm-1 $gap-sm-4 auto;
      font-weight: bold;
      font-family: "Consolas";
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>