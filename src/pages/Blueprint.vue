<template>
  <div id="blueprint" class="">
    <button
      class="absolute bottom-0 right-0 z-30 hidden p-10 mb-5 mr-5 bg-green-500 rounded-lg xl:hidden"
      @click="toggleBlueprintData()"
    >
      Show Data
    </button>
    <transition
      enter-active-class="slide-in-right"
      leave-active-class="slide-out-right"
    >
      <div
        v-if="blueprintSidebarOpen === true"
        class="fixed z-30 p-5 bg-purple-500 border-r rounded shadow-xl xl:hidden blueprint-data md:w-1/3 lg:w-72 md:top-30 md:right-0 lg:block m-9"
      >
        <h3 class="text-2xl bold">Data</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </transition>
    <Breadcrumb />
    <BetaMessage
      class="flex flex-row items-center p-5 mb-8 bg-blue-200 border-b-2 border-blue-300 rounded alert"
    />
    <div class="items-center mb-6">
      <h1 class="mb-3 text-3xl font-semibold text-gray-800 lg:mb-0">
        Blueprint Editor
      </h1>

      <p>Create blueprints for your content faster & easier than before.</p>

      <hr class="mt-2" />
    </div>
    <div class="flex">
      <div class="w-2/3 text-gray-900 rounded editor">
        <editor-menu-bubble
          :editor="editor"
          :keep-in-bounds="keepInBounds"
          v-slot="{ commands, isActive, menu }"
        >
          <div
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; top: ${menu.top + 10}px;`"
          >
            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <span class="mx-2 text-lg bold">B</span>
            </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <span class="mx-2 text-lg bold">I</span>
            </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <span class="mx-2 text-lg bold">U</span>
            </button>
          </div>
        </editor-menu-bubble>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="sticky z-10 -top-1">
            <div
              class="flex flex-wrap justify-center w-full p-4 mb-5 bg-gray-100 border-2 rounded md:justify-start space-between menubar"
            >
              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
                title="Bold"
              >
                <img
                  src="@/assets/icons/bold.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
                title="Italic"
              >
                <img
                  src="@/assets/icons/italic.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
                title="Strikethrough"
              >
                <img
                  src="@/assets/icons/strike.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                title="Underline"
              >
                <img
                  src="@/assets/icons/underline.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
                title="Code"
              >
                <img
                  src="@/assets/icons/code.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
                title="Paragraph"
              >
                <img
                  src="@/assets/icons/paragraph.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                <div class="w-6 h-6 md:w-8 md:h-8">
                  <span class="text-xl md:text-2xl">H1</span>
                </div>
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >
                <div class="w-6 h-6 md:w-8 md:h-8">
                  <span class="text-xl md:text-2xl">H2</span>
                </div>
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >
                <div class="w-6 h-6 md:w-8 md:h-8">
                  <span class="text-xl md:text-2xl">H3</span>
                </div>
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                title="Bullet List"
              >
                <img
                  src="@/assets/icons/ul.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
                title="Ordered List"
              >
                <img
                  src="@/assets/icons/ol.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
                title="Block Quote"
              >
                <img
                  src="@/assets/icons/quote.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
                title="Code Block"
              >
                <img
                  src="@/assets/icons/code.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                @click="commands.horizontal_rule"
                title="Horizontal Rule"
              >
                <img
                  src="@/assets/icons/hr.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                @click="commands.undo"
                title="Undo"
              >
                <img
                  src="@/assets/icons/undo.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>

              <button
                class="p-1 mx-1 my-1 border-2 border-gray-900 rounded menubar__button"
                @click="commands.redo"
                title="Redo"
              >
                <img
                  src="@/assets/icons/redo.svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                />
              </button>
              <div
                class="flex flex-wrap justify-center p-3 mt-2 border-2 rounded md:justify-start space-between menubar"
                v-if="blueprintData.averageValues"
              >
                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <AnnotationIcon class="inline w-5 h-5 mr-1 align-middle" />

                  <span
                    title="Word Count"
                    class="whitespace-no-wrap align-middle"
                    >0/{{
                      blueprintData.averageValues.averageWordCount.value
                    }}
                    Words</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <NewspaperIcon class="inline w-5 h-5 mr-1 align-middle" />

                  <span
                    title="Header Count"
                    class="whitespace-no-wrap align-middle"
                    >0/{{
                      blueprintData.averageValues.averageHeaderCount.value
                    }}
                    Headers</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <PhotographIcon class="inline w-5 h-5 mr-1 align-middle" />

                  <span
                    title="Image Count"
                    class="whitespace-no-wrap align-middle"
                    >0/{{
                      blueprintData.averageValues.averageImageCount.value
                    }}
                    Images</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <TemplateIcon class="inline w-5 h-5 mr-1 align-middle" />

                  <span
                    title="Paragraph Count"
                    class="whitespace-no-wrap align-middle"
                    >0/{{
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
            </div>
          </div>
        </editor-menu-bar>

        <editor-content
          class="p-5 border-2 border-gray-200 rounded editor__content"
          :editor="editor"
          id="editor"
          ref="editor"
          innerRef="editor"
        />
      </div>
      <div
        class="sticky top-0 flex-grow w-1/3 h-full p-5 ml-2 bg-gray-100 border-2 border-gray-200 rounded"
      >
        <h2 class="text-2xl bold">Blueprint Data</h2>
        <div v-if="!Object.keys(blueprintData).length && !questions.length">
          <p class="mt-2">You haven't loaded any data from a SERP analysis.</p>
          <router-link
            to="/analysis"
            tag="button"
            class="flex items-center self-center justify-center flex-initial w-full h-16 px-4 mt-3 font-semibold text-gray-100 duration-150 bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none"
          >
            <span>Load SERP Analysis</span>
          </router-link>
        </div>
        <div class="py-3" v-if="blueprintData.popularHeaders">
          <h3 class="text-xs font-bold">HEADERS</h3>
          <div class="flex flex-wrap my-3 -m-1">
            <span
              v-for="item in weightedHeaders"
              @click="insertHeader(item.header)"
              :key="item.header"
              class="px-2 m-1 text-sm font-bold leading-loose bg-indigo-200 rounded cursor-pointer hover:bg-indigo-400"
              >{{ item.header }}</span
            >
          </div>
        </div>
        <div class="py-3" v-if="questions.length">
          <h3 class="text-xs font-bold">QUESTIONS</h3>
          <div class="flex flex-wrap my-3 -m-1">
            <span
              @click="insertQuestion(item)"
              v-for="item in questions"
              :key="item.question"
              class="px-2 m-1 text-sm font-bold leading-loose bg-indigo-200 rounded cursor-pointer hover:bg-gray-300"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  // QuestionMarkCircleIcon,
  TemplateIcon,
  AnnotationIcon,
  NewspaperIcon,
  PhotographIcon,
} from "@vue-hero-icons/outline";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import BetaMessage from "@/components/BetaMessage";

import store from "../store";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";
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
  },
  components: {
    BetaMessage,
    Breadcrumb,
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    // QuestionMarkCircleIcon,
    TemplateIcon,
    AnnotationIcon,
    NewspaperIcon,
    PhotographIcon,
  },
  data() {
    return {
      blueprintSidebarOpen: false,
      // questions: store.getters.getQuestions || "null",
      // headers: store.getters.getheaders || "null",
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `<h1><strong>${
          store.getters.getBlueprint.searchTerm || "Your Amazing Article Title"
        }</strong></h1>`,
      }),
    };
  },
  methods: {
    toggleBlueprintData: function () {
      this.blueprintSidebarOpen = !this.blueprintSidebarOpen;
    },
    insertHeader: function (item) {
      var editorHtml = this.editor.getHTML();
      editorHtml += "<br>";
      this.editor.setContent(editorHtml);
      const transaction = this.editor.state.tr.insertText(item.trim());
      this.editor.view.dispatch(transaction);
      this.focusEditor();
    },
    insertQuestion: function (item) {
      var editorHtml = this.editor.getHTML();
      editorHtml += "<br>";
      this.editor.setContent(editorHtml);
      const transaction = this.editor.state.tr.insertText(item.trim());
      this.editor.view.dispatch(transaction);
      this.focusEditor();
    },
    focusEditor() {
      this.$refs.editor.focus();
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror h1 {
  font-size: 2em;
}
.ProseMirror h2 {
  font-size: 1.7em;
}
.ProseMirror h3 {
  font-size: 1.5em;
}
.ProseMirror h4 {
  font-size: 1.3em;
}
.ProseMirror h5 {
  font-size: 1.3em;
}

.ProseMirror ul {
  list-style: disc;
  margin: 0;
  padding: 0;
}

.editor__content pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  overflow-x: auto;
}

.menububble {
  position: absolute;
  display: -webkit-box;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  color: white;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}

.menububble.is-active {
  opacity: 1;
  visibility: visible;
}
</style>

<style scoped>
.slide-in-right {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-17 17:13:14
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-right
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-out-right {
  -webkit-animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-17 17:19:53
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-out-right
 * ----------------------------------------
 */
@-webkit-keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
}
</style>