<template>
  <div :class="$style[`combobox`]" @focusout="handleEsc">
    <label
      v-if="label"
      :for="`combobox-${_uid}`"
      :class="$style[`combobox__label`]"
    >
      {{ label }}
    </label>
    <input
      :id="`combobox-${_uid}`"
      ref="textfield"
      type="text"
      :class="$style[`combobox__txtfield`]"
      :role="`combobox`"
      :aria-expanded="visibleList.toString()"
      :aria-autocomplete="`list`"
      :aria-haspopup="true"
      :aria-controls="`combobox-${_uid}`"
      :aria-activedescendant="
        visibleList && selectedItem !== null && selectedItem > -1
          ? `combobox-item-${selectedItem}`
          : null
      "
      :value="inputValue"
      :placeholder="placeholder"
      :autocomplete="useAutocomplete ? `on` : `off`"
      :spellcheck="useSpellCheck.toString()"
      @input="handleInput"
      @keydown.down.prevent="handleArrowDown"
      @keydown.up.prevent="handleArrowUp"
      @keydown.enter="handleEnter"
      @keydown.space.prevent="handleSpace"
      @keydown.esc="handleEsc"
    />
    <button
      type="submit"
      :class="$style[`combobox__btn--search`]"
      :aria-labelledby="`btn-search--${_uid}`"
    >
      <font-awesome-icon
        :id="`btn-search--${_uid}`"
        :aria-label="`검색`"
        :icon="['fas', 'search']"
      />
    </button>
    <div
      ref="status"
      role="status"
      aria-live="polite"
      aria-relevant="additions"
      :class="$style[`combobox__status`]"
    ></div>
    <div
      :id="`combobox-${_uid}-result`"
      :role="`listbox`"
      :aria-label="`검색 결과`"
      :class="$style[`combobox__list`]"
    >
      <div
        v-for="(item, idx) in resultList"
        :id="`combobox-item-${idx}`"
        :key="idx"
        :role="`option`"
        :aria-selected="idx === selectedItem"
        :class="[
          $style[`combobox__list__item`],
          idx === selectedItem
            ? $style[`combobox__list__item--selected`]
            : null,
        ]"
        @click="handleClick(idx)"
      >
        {{ item.programtitle }}
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  props: {
    useAutocomplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    useSpellCheck: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: ``,
    },
    placeholder: {
      type: String,
      required: false,
      default: ``,
    },
  },
  data() {
    return {
      inputValue: ``,
      apiLoaded: false,
      visibleList: false,
      resultList: [],
      selectedItem: null,
      isTyping: false,
    };
  },
  watch: {
    inputValue(newVal, oldVal) {
      if (this.isTyping) this.search(newVal, this);
    },
  },
  methods: {
    setStatus(len) {
      const el = this.$refs.status;
      const newEl = document.createElement('div');
      newEl.textContent = `총 ${len}개의 검색 결과가 있습니다. 확장됨`;
      el.firstElementChild && el.firstElementChild.remove();
      el.append(newEl);
    },
    search: debounce((keyword, vm) => {
      if (!keyword) {
        vm.handleEsc();
        return;
      }

      const { getSearchContent } = vm.$api.search;
      getSearchContent(keyword).then(list => {
        vm.resultList = [...list];
        vm.selectedItem = null;
        if (vm.resultList.length) {
          vm.isTyping = false;
          vm.visibleList = true;
          vm.setStatus(vm.resultList.length);
        } else {
          vm.visibleList = false;
          vm.reaultStatus = ``;
        }
      });
    }, 400),
    setSelected() {
      if (!this.visibleList) return;

      this.inputValue = this.resultList[this.selectedItem].programtitle;

      this.resultList = [];
      this.apiLoaded = false;
      this.visibleList = false;
      this.isTyping = false;
    },
    handleInput(event) {
      this.isTyping = true;
      this.inputValue = event.target.value.trim();
    },
    handleArrowDown(event) {
      this.apiLoaded = true;
      if (this.selectedItem === null) this.selectedItem = -1;

      if (this.apiLoaded) {
        this.selectedItem = (this.selectedItem + 1) % this.resultList.length;
      }
    },
    handleArrowUp(event) {
      this.apiLoaded = true;
      if (!this.selectedItem) this.selectedItem = this.resultList.length;

      if (this.apiLoaded) {
        this.selectedItem = (this.selectedItem - 1) % this.resultList.length;
      }
    },
    handleEnter(event) {
      if (this.apiLoaded) {
        event.preventDefault();
        this.setSelected();
      }
    },
    handleSpace(event) {
      this.setSelected();
    },
    handleEsc(event) {
      this.resultList = [];
      this.apiLoaded = false;
      this.visibleList = false;
      this.isTyping = false;
    },
    handleClick(idx) {
      this.selectedItem = idx;
      this.setSelected();
    },
  },
};
</script>

<style lang="scss" module src="./index.scss"></style>
