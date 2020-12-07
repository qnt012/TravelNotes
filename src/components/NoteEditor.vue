<template>
  <div class="note-grid">
    <div class="note-editor">
      <input class="title-input" type="text" v-model="title" placeholder="Title" />
      <span>
        <input class="effectButton" type="button" value="B" onclick="document.execCommand('bold')" />
        <input class="effectButton" type="button" value="/" onclick="document.execCommand('italic')"/>
        <input class="effectButton" type="button" value="_" onclick="document.execCommand('underline')"/>
        <input class="effectButton"  type="button" value="-" onclick="document.execCommand('strikeThrough')"/>
      </span>
      <div class="tArea" contenteditable="true"></div>
      <span class="input-else">
        <input type="checkbox" id="due" class="duedate" v-model="due" />
        <label for="due" class="due-label">date</label>
        <input v-if="due" type="date" v-model="date" />
      </span>
      <div class="selects">
        <label for="favcolor" class="fav-label">select color</label>
        <input type="color" id="favcolor" value="#ffffff" v-model="theme" />

        <label for="category-input">category</label>
        <select v-model="category" id="category-input" @click="UpdateCategoryOption"></select>
        <input v-if="openCategory" type="text" class="categoryInput" v-model="addCategory" />
        <button v-if="!openCategory" @click="openCategory = !openCategory">
          <i class="fas fa-plus"></i>
        </button>
        <button v-if="openCategory" @click="createNewCategory">
          <i class="fas fa-check"></i>
        </button>
      </div>
      <span class="input-image">
        <label for="upload-image">Upload A Place</label>
        <button v-if="!uploadEnd && !uploading" class="upload-webcam-button" @click="startCam">
          Webcam
          <i class="fas fa-camera" aria-hidden="true"></i>
        </button>
        <div v-if="webcam" id="cam" />
        <h3 v-if="webcam && !downloadURL">You are staying at " {{ predicted }} " now</h3>
        <button v-if="!webcam && !uploadEnd && !uploading" class="upload-image-button" @click="selectFile">Image
          <i class="far fa-image" aria-hidden="true"></i>
        </button>
        <form ref="form">
          <input id="files" type="file" name="file" ref="uploadInput" :multiple="false" @change="detectFiles($event)" />
        </form>
      <img id="im" v-if="uploadEnd" :src="downloadURL" width="100%"/>
      <div v-if="uploadEnd">
        <button class="image-delete-button" dark small color="error" @click="deleteImage()">삭제</button>
      </div>
    </span>
      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </div>
    <div id="output"></div>
  </div>
</template>

<script>
import * as tmImage from "@teachablemachine/image";
import firebase from "firebase";

export default {
  data: function() {
    return {
      title: "",
      theme: "#ffffff",
      text: "",
      due: false,
      writer: this.email,
      category: "",
      openCategory: false,
      addCategory: "",
      html: "",

      model: null,
      webcam: null,

      predicted: "",
      preprdicted: "",
      showpredict: false,

      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: ""
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    filter() {
      return this.$store.getters.getFilter;
    },
    path() {
      return this.$store.getters.getPath;
    },
    email() {
      return this.$store.getters.getEmail;
    }
  },
  methods: {
    async createNew() {
      var dis = "none";
      if (
        this.filter == this.category ||
        this.filter == "--none--" ||
        this.filter == ""
      ) {
        dis = "inline-block";
      }

      this.text = document.getElementsByClassName("tArea")[0].textContent;
      this.html = document.getElementsByClassName("tArea")[0].innerHTML;

      let imgOut = document.getElementById("output").innerHTML;

      if (imgOut != "") {
        await this.testfunc();
        this.$store.commit("addNote", {
          title: this.title,
          text: this.text,
          theme: this.theme,
          date: this.date,
          writer: this.email,
          category: this.category,
          display: dis,
          html: this.html,
          img: imgOut,
          predict: this.predicted
        });
      } else
        this.$store.commit("addNote", {
          title: this.title,
          text: this.text,
          theme: this.theme,
          date: this.date,
          writer: this.writer,
          category: this.category,
          display: dis,
          html: this.html
        });

      this.title = "";
      (this.text = ""), (this.theme = "#ffffff");
      this.due = false;
      this.date = "";
      this.writer = "";
      this.category = "";
      this.html = "";
      this.predicted = "";
      this.uploadEnd = false;
      this.uploading = false;
      document.getElementsByClassName("tArea")[0].innerHTML = "";

      document.getElementById("im").src = "";
      document.getElementsById("output")[0].innerHTML = "";
    },
    createNewCategory() {
      this.openCategory = false;
      for (var i = 0; i < this.categories.length; i++) {
        if (this.addCategory == "") {
          alert("값을 입력해주세요.");
          return;
        } else if (this.addCategory == this.categories[i]) {
          alert("이미 존재하는 카테고리 입니다.");
          return;
        }
      }
      this.$store.commit("newCategory", this.addCategory);
      this.addCategory = "";
    },
    UpdateCategoryOption() {
      var sel = document.getElementById("category-input");
      sel.innerHTML = "";
      sel.appendChild(document.createElement("option"));
      for (var i = 0; i < this.categories.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("label", this.categories[i]);
        option.setAttribute("value", this.categories[i]);
        sel.appendChild(option);
      }
    },
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      this.showpredict = true;
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      // predict can take in an image, video or canvas html element
      let prediction = await this.model.predictTopK(
        this.webcam.canvas,
        1,
        true
      );
      this.predicted = prediction[0].className;
    },
    async startCam() {
      this.webcam = new tmImage.Webcam(570, 570, true);
      await this.webcam.setup(); // request access to the webcam
      await this.webcam.play();
      document.getElementById("cam").appendChild(this.webcam.canvas);
      window.requestAnimationFrame(this.loop);
    },
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
        var result = "";
        const reader = new FileReader();
        reader.readAsDataURL(fileList[x]);
        reader.onload = function() {
          result = reader.result;
          document.getElementById("output").innerHTML = result;
        };
      });
    },
    upload(file) {
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = firebase
        .storage()
        .ref("images/" + this.fileName)
        .put(file);
    },
    deleteImage() {
      firebase
        .storage()
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
          this.showpredict = false;
        })
        .catch(error => {
          console.error(`file delete error occured: ${error}`);
        });
      this.$refs.form.reset();
      this.downloadURL = "";
    },
    async predictImage(img) {
      // predict can take in an image, video or canvas html element
      const predictionI = await this.model.predictTopK(img, 1, true);
      console.log(predictionI[0]);
      if (this.preprdicted == "") {
        this.predicted = "";
        this.preprdicted = predictionI[0].className;
      } else {
        this.predicted = predictionI[0].className;
      }
    },
    async testfunc() {
      var image = new Image();
      image.src = document.getElementById("output").innerHTML;
      await this.predictImage(image);
      this.showpredict = true;
      await this.predictImage(image);
    }
  },
  async mounted() {
    let baseURL = "https://teachablemachine.withgoogle.com/models/TGkpUrS94/";
    this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json"
    );
    let maxPredictions = this.model.getTotalClasses();
    console.log(maxPredictions);
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            sp.bytesTransferred / sp.totalBytes * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$emit("downloadURL", downloadURL);
          });
        }
      );
    }
  }
};
</script>
<style>
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>