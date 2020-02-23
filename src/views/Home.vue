<template>
  <div>
    <section class="hero-container">
      <h1 class="header-title">
        Pendaftaran TahfidzQu
        <span class="isOpened" v-if="getIsProgramOpened">Dibuka</span>
        <span class="isClosed" v-else>Ditutup</span>
      </h1>
      <p class="header-description">{{ getHeaderDescription }}</p>
      <button class="daftar-program btn primary">Daftar Sekarang !</button>
    </section>
    <section class="timeline-container">
      <h2 class="header-title">Timeline</h2>
      <h3 class="description">
        Timeline TahfizhQu Angkatan ke-
        <span class="generation">{{ getTimeline.generation }}</span>
      </h3>
      <p class="timeline-details">
        <span class="title">Pendaftaran dan Tes Peserta Baru:</span>
        <br />Hingga
        <span class="dueDate">{{ getTimeline.dueDate }}</span>
        <br />
        <span class="title">Pengumuman dan Pemilihan Jadwal:</span>
        <br />
        <span class="announcement">{{ getTimeline.announcement }}</span>
        <br />
        <span class="title">Pembayaran:</span>
        <br />hingga
        <span class="paymentDate">{{ getTimeline.paymentDate }}</span>
        <br />
        <span class="title">Mulai Kelas:</span>
        <br />
        <span class="classStartDate">{{ getTimeline.classStartDate }}</span>
        <br />
        <span class="title">Penutupan TahfizhQu 9:</span>
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
            <img :src="data.image" alt="teacher-profile" />
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
  }

  .daftar-program {
    margin-top: $gap-m-1;
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
  min-height: 100vh;

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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    .card {
      margin: $gap-m-1;
      padding: $gap-m-1;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba($color: #aaa, $alpha: 0.4);
      text-align: center;
    }
  }
}

.teacher-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 380vh;

  .header-title {
    font-size: 2rem;
    margin-left: 1rem;
  }

  .card-container {
    margin-top: $gap-m-1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    .card {
      margin: $gap-m-1;
      padding: $gap-m-2;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba($color: #aaa, $alpha: 0.4);
      height: 460px;
      display: flex;
      flex-direction: column;

      .profile-image {
        flex-basis: 30%;
        border-radius: 10px;
        background: $primary;
      }

      .teacher-name {
        margin-top: $gap-sm-2;
        font-size: 18px;
        text-align: center;
      }

      .teacher-details {
        margin-top: $gap-sm-4;
      }

      .contact-container {
        flex: 1;
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
  min-height: 350vh;

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