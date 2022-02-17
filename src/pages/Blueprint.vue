<template>
  <div id="blueprint">
    <vue-topprogress ref="topProgress" color="#4f46e5"></vue-topprogress>
    <div id="animHolder" class="slide-in-right">
      <Breadcrumb />
      <div class="items-center mb-6">
        <h1
          class="mb-3 text-3xl font-semibold text-gray-800  dark:text-gray-300 lg:mb-0"
        >
          Blueprint Editor
        </h1>

        <p class="text-gray-800 dark:text-gray-300">
          Create blueprints for your content faster & easier than before.
        </p>

        <hr class="mt-2" />
      </div>
      <div
        class="flex justify-center my-20 text-indigo-600"
        v-if="loader.loading"
      >
        <LoadingSpinner
          class="flex justify-center w-40 ml-auto mr-auto text-center fill-current "
        />
      </div>
      <div class="flex" v-if="loader.loaded && !loader.loading">
        <div class="w-2/3 h-full text-gray-900">
          <div
            class="flex flex-wrap justify-center p-3 mb-2 text-gray-600 border  dark:border-gray-600 md:justify-start space-between menubar dark:text-gray-400"
            v-if="averageValues"
          >
            <div class="flex flex-no-wrap items-center mr-4">
              <AnnotationIcon class="inline w-5 h-5 mr-1 align-middle" />

              <span title="Word Count" class="whitespace-no-wrap align-middle"
                >{{ counts.words }}/{{
                  averageValues.averageWordCount.value
                }}
                Words</span
              >
            </div>

            <div class="flex flex-no-wrap items-center mr-4">
              <NewspaperIcon class="inline w-5 h-5 mr-1 align-middle" />

              <span title="Header Count" class="whitespace-no-wrap align-middle"
                >{{ counts.headers }}/{{
                  averageValues.averageHeaderCount.value
                }}
                Headers</span
              >
            </div>

            <div class="flex flex-no-wrap items-center mr-4">
              <PhotographIcon class="inline w-5 h-5 mr-1 align-middle" />

              <span title="Image Count" class="whitespace-no-wrap align-middle"
                >0/{{ averageValues.averageImageCount.value }} Images</span
              >
            </div>

            <div class="flex flex-no-wrap items-center mr-4">
              <TemplateIcon class="inline w-5 h-5 mr-1 align-middle" />

              <span
                title="Paragraph Count"
                class="whitespace-no-wrap align-middle"
                >{{ counts.paragraphs }}/{{
                  averageValues.averageParagraphCount.value
                }}
                Paragraphs</span
              >
            </div>

            <!-- <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <QuestionMarkCircleIcon
                    class="inline w-5 h-5 mr-1 align-middle"
                  />
                  <span
                    title="Questions Answered"
                    class="whitespace-no-wrap align-middle"
                    >0/26 Questions</span
                  >
                </div> -->
          </div>
          <quill-editor
            class="dark:text-gray-300"
            id="myText"
            ref="myQuillEditor"
            v-model="content"
            :options="quillConfig"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
          />
          <button
            class="flex items-center self-center flex-grow w-full h-16 px-4 mt-3 mb-2 font-semibold text-white duration-150 bg-indigo-600 rounded-lg  sm:w-auto hover:bg-indigo-500 focus:outline-none whitespace-nowrap"
            @click="saveBlueprint()"
            :disabled="this.loader.saving === true"
            title="Save Blueprint"
            v-if="content"
          >
            <SaveIcon
              class="flex w-6 h-6 mr-2 align-middle"
              :id="'saveBlueprintIcon' + '_x'"
            />
            <LoadingSpinner
              class="items-center hidden w-6 h-6 mr-2 fill-current"
              :id="'saveBlueprintIcon' + '_spinner'"
            />
            <div class="flex ml-auto mr-auto">Save Blueprint</div>
          </button>
        </div>

        <div
          class="flex-grow w-1/3 h-full p-5 ml-2 border border-gray-200  dark:border-gray-600 dark:bg-gray-700"
        >
          <h2 class="text-2xl bold dark:text-gray-400">Blueprint Data</h2>

          <div v-if="!weightedHeaders && !weightedQuestions">
            <p class="mt-2 dark:text-gray-400">
              You haven't loaded any data from a SERP analysis.
            </p>
            <router-link
              to="/analysis"
              tag="button"
              class="flex items-center self-center justify-center flex-initial w-full h-16 px-4 mt-3 font-semibold text-gray-100 duration-150 bg-indigo-600 rounded-lg shadow  hover:bg-indigo-500 focus:outline-none"
            >
              <span>Load SERP Analysis</span>
            </router-link>
          </div>

          <div class="py-3" v-if="weightedHeaders">
            <h3 class="text-xs font-bold dark:text-gray-400">HEADERS</h3>
            <div class="flex flex-wrap my-3 -m-1">
              <span
                v-for="item in weightedHeaders"
                @click="insertHeader(item.header)"
                :key="item.header"
                :class="item.included ? 'bg-green-400' : 'bg-indigo-200 '"
                class="px-2 m-1 text-xs font-bold leading-loose rounded cursor-pointer  hover:bg-indigo-400"
                >{{ item.header }}</span
              >
            </div>
          </div>

          <div class="py-3" v-if="weightedQuestions">
            <h3 class="text-xs font-bold dark:text-gray-400">QUESTIONS</h3>
            <div class="flex flex-wrap my-3 -m-1">
              <span
                @click="insertQuestion(item.question)"
                v-for="(item, index) in weightedQuestions"
                :key="index"
                :class="item.included ? 'bg-green-400' : 'bg-indigo-200 '"
                class="px-2 m-1 text-xs font-bold leading-loose rounded cursor-pointer  hover:bg-gray-300"
                >{{ item.question }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <ErrorMessage
        class="flex flex-row items-center p-5 mt-5 bg-red-200 border-b-2 border-red-300 rounded  alert swing-in-top-fwd"
        v-if="errorHandler.error && loader.loading != true"
        v-bind:message="errorHandler.errorMessage"
      />
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

import config from "../../config";
import { vueTopprogress } from "vue-top-progress";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {
  TemplateIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
  SaveIcon,
} from "@vue-hero-icons/outline";
import { parse } from "node-html-parser";
const wordCount = require("word-character-count");

export default {
  name: "Blueprint",

  computed: {
    weightedHeaders: function () {
      if (typeof this.blueprintPropData === "undefined") {
        return this.blueprintApiData.weightedHeaders;
      } else {
        let data = this.blueprintPropData.popularHeaders.filter(function (
          item
        ) {
          return item.weight === true;
        });

        data.forEach(function (item) {
          item.included = false;
        });

        return data;
      }
    },
    weightedQuestions: function () {
      let newArr = {};
      if (typeof this.blueprintPropData === "undefined") {
        return this.blueprintApiData.weightedQuestions;
      } else {
        let questions = [];
        for (const result of this.blueprintPropData.results) {
          for (const question of result.questions) {
            questions.push(question);
          }
        }
        // Still need to add Google's questions here
        //questions.filter(this.onlyUnique);
        let nquestions = questions;
        newArr = nquestions.map(function (value) {
          return { question: value, included: false };
        });
        return newArr;
      }
    },
    averageValues: function () {
      if (typeof this.blueprintPropData === "undefined") {
        return this.blueprintApiData.averageValues;
      } else {
        return this.blueprintPropData.averageValues;
      }
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  components: {
    Breadcrumb,
    TemplateIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    ErrorMessage,
    SaveIcon,
    vueTopprogress,
    LoadingSpinner,
    QuillEditor: async () => {
      await Promise.all([
        import("quill/dist/quill.core.css"),
        import("quill/dist/quill.snow.css"),
      ]);
      const { quillEditor } = await import("vue-quill-editor");

      return quillEditor;
    },
  },
  props: ["blueprintPropData"],
  data() {
    return {
      counts: {
        words: 0,
        headers: 0,
        paragraphs: 0,
        images: 0,
      },
      content:
        typeof this.blueprintPropData === "undefined"
          ? `<h1><strong>My amazing article title</strong></h1>`
          : `<h1><strong>${this.blueprintPropData.searchTerm}</strong></h1>`,
      quillConfig: Object.freeze({
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      }),
      retrieving: false,
      errorHandler: {
        error: false,
        errorMessage: "Something Went Wrong!",
      },
      loader: {
        loaded: true,
        loading: false,
        saving: false,
      },
      successMessage: "",
      api_url: config.API_URL,
      blueprintApiData: [],
      newBluePrintId: "",
      delay: 3800, // anti-rebound for 3.8s
      lastExecution: 0,
      autoSaving: false,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onEditorBlur(quill) {
      //console.log("editor blur!", quill);
    },
    // eslint-disable-next-line no-unused-vars
    onEditorFocus(quill) {
      //console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      this.calculateAverage(quill);
    },
    async onEditorChange({ quill }) {
      this.calculateAverage(quill);
      this.checkContent(quill);
      this.autoSave();
    },
    calculateAverage: async function (quill) {
      const quillRoot = quill.root.innerHTML;
      const parsed = parse(quillRoot);
      const pTags = parsed.querySelectorAll("p");
      const h1Elements = parsed.querySelectorAll("h1");
      const h2Elements = parsed.querySelectorAll("h2");
      const h3Elements = parsed.querySelectorAll("h3");
      const h4Elements = parsed.querySelectorAll("h4");
      const h5Elements = parsed.querySelectorAll("h5");
      this.counts.paragraphs = pTags.length;
      this.counts.headers =
        h1Elements.length +
        h2Elements.length +
        h3Elements.length +
        h4Elements.length +
        h5Elements.length;

      const result = await wordCount.WordCount(quillRoot);
      this.counts.words = result.WordCount;
    },
    checkContent: function (quill) {
      if (this.weightedHeaders || this.blueprintApiData.weightedHeaders) {
        (this.haveblueprintPropData()
          ? this.weightedHeaders
          : this.blueprintApiData.weightedHeaders
        ).forEach(function (header) {
          header.included = quill.getText().includes(header.header)
            ? true
            : false;
        });

        (this.haveblueprintPropData()
          ? this.weightedQuestions
          : this.blueprintApiData.weightedQuestions
        ).forEach(function (question) {
          question.included = quill.getText().includes(question.question)
            ? true
            : false;
        });
        this.autoSave();
      }
    },
    insertHeader: function (item) {
      this.content += "<h2>" + item.trim() + "</h2>";
    },
    insertQuestion: function (item) {
      this.content += "<h2>" + item.trim() + "</h2>";
    },
    focusEditor() {
      this.$refs.myQuillEditor.$el.focus();
      this.autoSave();
    },
    showSpinner: function (id) {
      if (
        document.getElementById(id + "_x") &&
        document.getElementById(id + "_spinner")
      )
        document.getElementById(id + "_x").classList.remove("flex");
      document.getElementById(id + "_x").classList.add("hidden");
      document.getElementById(id + "_spinner").classList.remove("hidden");
      document.getElementById(id + "_spinner").classList.add("flex");
    },
    hideSpinner: function (id) {
      if (
        document.getElementById(id + "_x") &&
        document.getElementById(id + "_spinner")
      )
        document.getElementById(id + "_x").classList.remove("hidden");
      document.getElementById(id + "_x").classList.add("flex");
      document.getElementById(id + "_spinner").classList.remove("flex");
      document.getElementById(id + "_spinner").classList.add("hidden");
    },
    autoSave: function () {
      if (this.lastExecution + this.delay < Date.now() && this.autoSaving) {
        this.saveBlueprint();
        this.lastExecution = Date.now();
      }
    },
    saveBlueprint: async function () {
      this.loader.saving = true;
      this.showSpinner("saveBlueprintIcon");

      try {
        const blueprint = {
          averageValues: this.haveblueprintPropData()
            ? this.blueprintPropData.averageValues
            : this.blueprintApiData.averageValues,
          weightedHeaders: this.haveblueprintPropData()
            ? this.weightedHeaders
            : this.blueprintApiData.weightedHeaders,
          weightedQuestions: this.haveblueprintPropData()
            ? this.weightedQuestions
            : this.blueprintApiData.weightedHeaders,
          content: this.content,
          searchTerm: this.haveblueprintPropData()
            ? this.blueprintPropData.searchTerm
            : this.blueprintApiData.searchTerm,
          id: this.haveblueprintPropData()
            ? this.newBluePrintId
            : this.blueprintApiData._id,
        };
        let response = await fetch(`${this.api_url}/blueprint/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(blueprint),
        });
        let data = await response.json();
        if (data.error) {
          this.errorHandler.errorMessage = data.error.message;
          this.errorHandler.error = true;
        } else {
          this.errorHandler.error = false;
          this.newBluePrintId = data.id;
        }
      } catch (err) {
        this.errorHandler.errorMessage = "Something went wrong!";
      } finally {
        this.hideSpinner("saveBlueprintIcon");
        this.autoSaving = true;
        this.loader.saving = false;
      }
    },
    retrieve: async function (id) {
      try {
        let response = await fetch(
          `${this.api_url}/blueprint/retrieve?id=${id}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        let data = await response.json();
        if (data.error) {
          console.log(data.error);
          if (data.error.message === "Data Not Ready") {
            setTimeout(() => {
              this.retrieve(id);
            }, 1500);
          } else {
            this.errorHandler.errorMessage = data.error.message;
            this.errorHandler.error = true;
            this.loader.loaded = false;
            this.loader.loading = false;
            this.$refs.topProgress.done();
          }
        } else {
          this.blueprintApiData = data;
          this.content = data.content;
          this.loadedAndShow();
        }
      } catch (err) {
        this.errorHandler.errorMessage = "Something went wrong!";
        this.$refs.topProgress.done();
      }
    },
    haveblueprintPropData: function () {
      if (typeof this.blueprintPropData === "undefined") {
        return false;
      } else {
        return true;
      }
    },
    loadedAndShow() {
      this.loader.loaded = true;
      this.loader.loading = false;
      this.search.idFromDb = "";
      this.$refs.topProgress.done();
    },
  },

  mounted() {
    if (this.$route.query.retrieve) {
      this.retrieving = true;
      this.$refs.topProgress.start();
      this.loader.loading = true;
      this.retrieve(this.$route.query.retrieve);
    }
  },
};
</script>

<style>
</style>