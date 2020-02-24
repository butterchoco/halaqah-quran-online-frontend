<template>
  <div>
    <img class="vector svg-1" src="@/assets/img/Vector 8.png" alt="vector-8" />
    <img class="vector svg-2" src="@/assets/img/Vector 9.png" alt="vector-9" />
    <img class="vector svg-3" src="@/assets/img/Vector 10.png" alt="vector-10" />
    <img class="vector svg-4" src="@/assets/img/Vector 11.png" alt="vector-11" />
    <img class="vector svg-5" src="@/assets/img/Vector 12.png" alt="vector-12" />
    <img class="vector svg-6" src="@/assets/img/Vector 13.png" alt="vector-13" />
    <img class="vector svg-7" src="@/assets/img/Vector 8.png" alt="vector-8" />
    <img class="vector svg-8" src="@/assets/img/Vector 9.png" alt="vector-9" />
    <section class="hero-container">
      <h1 class="header-title">
        Pendaftaran TahfidzQu
        <span class="isOpened" v-if="getIsProgramOpened">Dibuka</span>
        <span class="isClosed" v-else>Ditutup</span>
      </h1>
      <p class="header-description">{{ getHeaderDescription }}</p>
      <button v-if="getIsProgramOpened" class="daftar-program btn primary">Daftar Sekarang !</button>
    </section>
    <section class="timeline-container">
      <h2 class="header-title">Timeline</h2>
      <h3 class="description">
        Timeline TahfizhQu Angkatan ke-
        <span class="generation">{{ getTimeline.generation }}</span>
      </h3>
      <p class="timeline-details">
        <span class="title">Pendaftaran dan Tes Peserta Baru</span>
        <br />Hingga
        <span class="dueDate">{{ getTimeline.dueDate }}</span>
        <br />
        <span class="title">Pengumuman dan Pemilihan Jadwal</span>
        <br />
        <span class="announcement">{{ getTimeline.announcement }}</span>
        <br />
        <span class="title">Pembayaran</span>
        <br />hingga
        <span class="paymentDate">{{ getTimeline.paymentDate }}</span>
        <br />
        <span class="title">Mulai Kelas</span>
        <br />
        <span class="classStartDate">{{ getTimeline.classStartDate }}</span>
        <br />
        <span class="title">Penutupan TahfizhQu 9</span>
        <br />
        <span class="programClosingDate">{{ getTimeline.programClosing }}</span>
      </p>
    </section>
    <section class="curriculum-container">
      <h2 class="header-title">Kurikulum</h2>
      <p class="description">{{ getCurriculumDescription }}</p>
      <div class="card-container">
        <div class="card" v-for="(data, id) in getAllCurriculums" :key="id">
          <p>{{ data.content }}</p>
        </div>
      </div>
    </section>
    <section class="teacher-container">
      <h2 class="header-title">Pengajar</h2>
      <div class="card-container">
        <div class="card" v-for="(data, index) in getAllTeachers" :key="index">
          <div class="profile-image">
            <img
              class="default-profile"
              src="@/assets/img/profile-img.png"
              alt="default-profile-img"
            />
            <img :src="data.image" v-if="data.image != ''" alt="teacher-profile" />
          </div>
          <h4 class="teacher-name">{{ data.name }}</h4>
          <p class="teacher-details">
            <strong>Pendidikan Terakhir:</strong>
            <br />
            <span>{{ data.lastEducation }}</span>
            <br />
            <strong>Aktivitas:</strong>
            <br />
            <span>{{ data.activity }}</span>
            <br />
          </p>
          <div class="contact-container">
            <a :href="data.contact.facebook">Facebook</a>
            <a :href="data.contact.linkedin">Linkedin</a>
          </div>
        </div>
      </div>
    </section>
    <section class="facilities-container">
      <h2 class="header-title">Fasilitas</h2>
      <div class="card-container">
        <div class="card" v-for="(data, id) in getAllFacilities" :key="id">
          <div class="card-image">
            <img :src="data.image" alt="card-image" />
          </div>
          <p class="facility">{{ data.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters([
      "getIsProgramOpened",
      "getTimeline",
      "getHeaderDescription",
      "getCurriculumDescription",
      "getAllTeachers",
      "getAllCurriculums",
      "getAllFacilities"
    ])
  }
};
</script>

<style lang="scss">
@media only screen and (min-width: 768px) {
  h1.header-title {
    font-size: $h1 !important;
  }

  h2.header-title {
    font-size: $h2 !important;
  }

  .vector {
    max-height: 120% !important;
    max-width: 120% !important;

    &.svg-1 {
      top: 45% !important;
      right: 0 !important;
      margin-right: -35rem !important;
    }

    &.svg-2 {
      top: 45% !important;
      right: 0 !important;
      margin-right: -25rem !important;
    }

    &.svg-3 {
      top: 180% !important;
      left: 0 !important;
      margin-left: -50rem !important;
    }

    &.svg-4 {
      top: 180% !important;
      left: 0 !important;
      margin-left: -45rem !important;
    }

    &.svg-5 {
      top: 310% !important;
      right: 0 !important;
      margin-right: -45rem !important;
    }

    &.svg-6 {
      top: 310% !important;
      right: 0 !important;
      margin-right: -40rem !important;
    }

    &.svg-7 {
      top: 530% !important;
      left: 0 !important;
      margin-left: -60rem !important;
    }

    &.svg-8 {
      top: 530% !important;
      left: 0 !important;
      margin-left: -55rem !important;
    }
  }
  .hero-container {
    padding: 10% !important;

    .header-title {
      margin-top: -6rem !important;
    }
    .header-description {
      max-width: 50%;
    }
  }

  .timeline-container {
    padding: 10% !important;
    display: flex;

    .description {
      font-size: 24px !important;
    }

    .timeline-details {
      font-size: 14px !important;
    }
  }

  .curriculum-container {
    max-height: 100vh !important;

    .description {
      max-width: 50%;
    }
  }

  .teacher-container {
    min-height: 150vh !important;
    padding: 4rem !important;

    .header-title {
      margin-bottom: $gap-m-2;
    }

    .card-container {
      width: 100%;
      margin: auto;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
      grid-gap: $gap-m-2;
    }
  }

  .facilities-container {
    min-height: 150vh !important;

    .header-title {
      margin-bottom: $gap-m-2;
    }

    .card-container {
      width: 80%;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
    }
  }
}

// ------- Mobile Version --------  //

.vector {
  position: absolute;
  max-height: 600px;
  max-width: 600px;

  &.svg-1 {
    top: 60%;
    right: 0;
    margin-right: -25rem;
    z-index: -1;
  }

  &.svg-2 {
    top: 60%;
    right: 0;
    margin-right: -25rem;
    z-index: -1;
  }

  &.svg-3 {
    top: 180%;
    left: 0;
    margin-left: -30rem;
    z-index: -1;
  }

  &.svg-4 {
    top: 175%;
    left: 0;
    margin-left: -25rem;
    z-index: -1;
  }

  &.svg-5 {
    top: 365%;
    right: 0;
    margin-right: -25rem;
    z-index: -1;
  }

  &.svg-6 {
    top: 360%;
    right: 0;
    margin-right: -22rem;
    z-index: -1;
  }

  &.svg-7 {
    top: 860%;
    left: 0;
    margin-left: -25rem;
    z-index: -1;
  }

  &.svg-8 {
    top: 860%;
    left: 0;
    margin-left: -25rem;
    z-index: -1;
  }
}

.hero-container {
  padding: $gap-m-2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .header-title {
    color: $black;
    text-align: left;
    font-size: 2rem;
    word-wrap: break-word;
  }

  .header-description {
    margin-top: $gap-m-1;
    font-size: 14px;
  }

  .daftar-program {
    margin-top: $gap-m-2;
  }
}

.timeline-container {
  padding: $gap-m-2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .header-title {
    font-size: 2rem;
  }

  .description {
    margin-top: $gap-m-1;
    font-size: 16px;
    word-wrap: break-word;
  }

  .timeline-details {
    margin-top: $gap-sm-2;
    word-wrap: break-all;
    font-size: 14px;
    white-space: pre-wrap;

    span.title {
      font-weight: 600;
    }
  }
}

.curriculum-container {
  padding: $gap-m-2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200vh;

  .header-title {
    font-size: $gap-m-2;
  }

  .description {
    margin-top: $gap-m-2;
    font-weight: 500;
    text-align: center;
  }

  .card-container {
    margin-top: $gap-m-1;
    display: grid;
    grid-gap: $gap-m-1;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    .card {
      padding: $gap-m-1;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba($color: #aaa, $alpha: 0.4);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.teacher-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 500vh;

  .header-title {
    font-size: 2rem;
    margin-left: 5%;
  }

  .card-container {
    max-width: 90%;
    margin: $gap-m-1 auto;
    display: grid;
    grid-gap: $gap-m-2;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    .card {
      padding: $gap-m-2;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba($color: #aaa, $alpha: 0.4);
      display: flex;
      flex-direction: column;

      .profile-image {
        flex-basis: 100px;
        border-radius: 10px;
        background: #f7f7f7;
        display: flex;
        align-items: center;

        img {
          margin: auto;
          max-width: 80%;
        }
      }

      .teacher-name {
        margin-top: $gap-sm-2;
        font-size: 18px;
        text-align: center;
      }

      .teacher-details {
        flex: 1;
        margin-top: $gap-sm-4;
      }

      .contact-container {
        flex-basis: 50px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;

        a {
          display: inline-block;
          margin-right: $gap-sm-3;
          font-size: 14px;
          color: $black;

          &:hover {
            font-weight: 600;
          }
        }
      }
    }
  }
}

.facilities-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 450vh;

  .header-title {
    font-size: 2rem;
  }

  .card-container {
    margin-top: $gap-m-1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    .card {
      margin: $gap-m-1;
      padding: $gap-m-2;
      border-radius: 10px;
      background: white;
      box-shadow: 0 0 5px rgba($color: #aaa, $alpha: 0.4);
      display: flex;
      flex-direction: column;

      .card-image {
        height: 180px;
        border-radius: 10px;
        background: $primary;
      }

      .facility {
        margin-top: $gap-m-2;
        text-align: center;
      }
    }
  }
}
</style>
