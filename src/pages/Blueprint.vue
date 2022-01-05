<template>
  <div id="blueprint" class="slide-in-right">
    <Breadcrumb />
    <BetaMessage />
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
    <div class="flex">
      <div class="w-2/3 h-full text-gray-900">
        <div
          class="flex flex-wrap justify-center p-3 mb-2 text-gray-600 border  dark:border-gray-600 md:justify-start space-between menubar dark:text-gray-400"
          v-if="blueprintData.averageValues"
        >
          <div class="flex flex-no-wrap items-center mr-4">
            <AnnotationIcon class="inline w-5 h-5 mr-1 align-middle" />

            <span title="Word Count" class="whitespace-no-wrap align-middle"
              >{{ counts.words }}/{{
                blueprintData.averageValues.averageWordCount.value
              }}
              Words</span
            >
          </div>

          <div class="flex flex-no-wrap items-center mr-4">
            <NewspaperIcon class="inline w-5 h-5 mr-1 align-middle" />

            <span title="Header Count" class="whitespace-no-wrap align-middle"
              >{{ counts.headers }}/{{
                blueprintData.averageValues.averageHeaderCount.value
              }}
              Headers</span
            >
          </div>

          <div class="flex flex-no-wrap items-center mr-4">
            <PhotographIcon class="inline w-5 h-5 mr-1 align-middle" />

            <span title="Image Count" class="whitespace-no-wrap align-middle"
              >0/{{
                blueprintData.averageValues.averageImageCount.value
              }}
              Images</span
            >
          </div>

          <div class="flex flex-no-wrap items-center mr-4">
            <TemplateIcon class="inline w-5 h-5 mr-1 align-middle" />

            <span
              title="Paragraph Count"
              class="whitespace-no-wrap align-middle"
              >{{ counts.paragraphs }}/{{
                blueprintData.averageValues.averageParagraphCount.value
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
      </div>
      <div
        class="flex-grow w-1/3 h-full p-5 ml-2 border border-gray-200  dark:border-gray-600 dark:bg-gray-700"
      >
        <h2 class="text-2xl bold dark:text-gray-400">Blueprint Data</h2>
        <div v-if="!Object.keys(blueprintData).length && !questions.length">
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
        <div class="py-3" v-if="blueprintData.popularHeaders">
          <h3 class="text-xs font-bold dark:text-gray-400">HEADERS</h3>
          <div class="flex flex-wrap my-3 -m-1">
            <span
              v-for="item in weightedHeaders"
              @click="insertHeader(item.header)"
              :key="item.header"
              class="px-2 m-1 text-xs font-bold leading-loose bg-indigo-200 rounded cursor-pointer  hover:bg-indigo-400"
              >{{ item.header }}</span
            >
          </div>
        </div>
        <div class="py-3" v-if="questions.length">
          <h3 class="text-xs font-bold dark:text-gray-400">QUESTIONS</h3>
          <div class="flex flex-wrap my-3 -m-1">
            <span
              @click="insertQuestion(item)"
              v-for="item in questions"
              :key="item.question"
              class="px-2 m-1 text-xs font-bold leading-loose bg-indigo-200 rounded cursor-pointer  hover:bg-gray-300"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import BetaMessage from "@/components/BetaMessage";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {
  //QuestionMarkCircleIcon,
  TemplateIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
} from "@vue-hero-icons/outline";
import { parse } from "node-html-parser";
const wordCount = require("word-character-count");

import store from "../store";

export default {
  name: "Blueprint",

  computed: {
    ...mapGetters({
      blueprintData: "getBlueprint",
      questions: "getQuestions",
      headers: "getHeaders",
    }),
    weightedHeaders: function () {
      return this.blueprintData.popularHeaders.filter(function (item) {
        return item.weight === true;
      });
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  components: {
    BetaMessage,
    Breadcrumb,
    TemplateIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
    QuillEditor: async () => {
      await Promise.all([
        import("quill/dist/quill.core.css"),
        import("quill/dist/quill.snow.css"),
      ]);
      const { quillEditor } = await import("vue-quill-editor");

      return quillEditor;
    },
  },
  data() {
    return {
      counts: {
        words: 0,
        headers: 0,
        paragraphs: 0,
      },
      content: `<h1><strong>${
        store.getters.getBlueprint.searchTerm || "Your Amazing Article Title"
      }</strong></h1>`,
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

    insertHeader: function (item) {
      const position = this.editor.getText();
      const content = item.trim();
      this.editor.insertText(position, content, { bold: true });
    },
    insertQuestion: function (item) {
      const position = this.editor.getText();
      const content = item.trim();
      this.editor.insertText(position, content, { bold: true });
    },
    focusEditor() {
      this.$refs.myQuillEditor.$el.focus();
    },
  },

  mounted() {},
};
</script>

<style>
</style>