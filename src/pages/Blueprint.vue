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
    <!-- breadcrumb -->
    <!-- <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
      <ol class="inline-flex p-0 list-none">
        <li class="flex items-center text-purple">
          <a href="/" class="text-gray-700">Home</a>
          <svg
            class="w-3 h-3 mx-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
        </li>
        <li class="flex items-center">
          <a href="/dashboard" class="text-gray-600">SERP Analysis</a>
        </li>
      </ol>
    </nav> -->
    <!-- breadcrumb end -->

    <div class="items-center mb-6">
      <h1 class="mb-3 text-3xl font-semibold text-gray-800 lg:mb-0">
        Blueprint Editor
      </h1>

      <p>
        Coming soon. Create blueprints for your content faster & easier than
        before.
      </p>
      <!-- <button
        class="px-6 py-2 font-semibold text-white duration-150 rounded-lg shadow bg-purple hover:bg-purple-light focus:outline-none"
      >
        View Logs
      </button> -->
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
              >
                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <svg
                    class="inline w-5 h-5 mr-1 align-middle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>

                  <span
                    title="Word Count"
                    class="whitespace-no-wrap align-middle"
                    >300/1600 Words</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <svg
                    class="inline w-5 h-5 mr-1 align-middle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    ></path>
                  </svg>

                  <span
                    title="Header Count"
                    class="whitespace-no-wrap align-middle"
                    >1/7 Headers</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <svg
                    class="inline w-5 h-5 mr-1 align-middle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>

                  <span
                    title="Image Count"
                    class="whitespace-no-wrap align-middle"
                    >0/17 Images</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <svg
                    class="inline w-5 h-5 mr-1 align-middle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    ></path>
                  </svg>

                  <span
                    title="Paragraph Count"
                    class="whitespace-no-wrap align-middle"
                    >1/24 Paragraphs</span
                  >
                </div>

                <div class="flex flex-no-wrap items-center mr-4 text-gray-600">
                  <svg
                    class="inline w-5 h-5 mr-1 align-middle"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span
                    title="Questions Answered"
                    class="whitespace-no-wrap align-middle"
                    >0/26 Questions</span
                  >
                </div>
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
        <div v-if="!headers.length && !questions.length">
          <p class="mt-2">You haven't loaded any data from a SERP analysis.</p>
          <router-link
            to="/analysis"
            tag="button"
            class="flex items-center self-center justify-center flex-initial w-full h-16 px-4 mt-3 font-semibold text-gray-100 duration-150 bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none"
          >
            <span>Load SERP Analysis</span>
          </router-link>
        </div>
        <div class="py-3" v-if="headers.length">
          <h3 class="text-xs font-bold">HEADERS</h3>
          <!-- This is the tags container -->
          <div class="flex flex-wrap my-3 -m-1">
            <span
              v-for="item in headers"
              @click="insertHeader(item)"
              :key="item.header"
              class="px-2 m-1 text-sm font-bold leading-loose bg-indigo-200 rounded-full cursor-pointer hover:bg-gray-300"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="py-3" v-if="questions.length">
          <h3 class="text-xs font-bold">QUESTIONS</h3>
          <!-- This is the tags container -->
          <div class="flex flex-wrap my-3 -m-1">
            <span
              @click="insertQuestion(item)"
              v-for="item in questions"
              :key="item.question"
              class="px-2 m-1 text-sm font-bold leading-loose bg-indigo-200 rounded-full cursor-pointer hover:bg-gray-300"
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
import { mapGetters } from "vuex";
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
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
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
        content: `<h1><strong>${store.getters.getBlueprint.searchTerm}</strong></h1>`,
      }),
    };
  },
  methods: {
    toggleBlueprintData: function () {
      this.blueprintSidebarOpen = !this.blueprintSidebarOpen;
    },
    insertHeader: function (item) {
      const transaction = this.editor.state.tr.insertText(item.trim());
      this.editor.view.dispatch(transaction);
      this.focusEditor();
    },
    insertQuestion: function (item) {
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