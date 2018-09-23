<!-- no template -->
<script>
export default {
  name: 'VBtnGroup',
  render(h) {
    return h(
      'ul',
      { class: 'button-group' },
      this.$slots.default.map(v => {
        // eliminate returns, comments
        if (!v.tag) return v

        return h('li', [v])
      })
    )
  }
}
</script>

<style scoped>
.button-group,
.button-group li {
  display: inline-block;
  *display: inline;
  zoom: 1;
}

.button-group {
  font-size: 0; /* Inline block elements gap - fix */
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 7px;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  border-radius: 7px;
}

.button-group li {
  margin-right: -1px; /* Overlap each right button border */
}

.button-group .button {
  font-size: 13px; /* Set the font size, different from inherited 0 */
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}

.button-group .button:active {
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset,
    -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset,
    -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset,
    -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
}

.button-group li:first-child .button {
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}

.button-group li:first-child .button:active {
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, -5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
}

.button-group li:last-child .button {
  -moz-border-radius: 0 3px 3px 0;
  -webkit-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
}

.button-group li:last-child .button:active {
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2) inset, 5px 0 5px -3px rgba(0, 0, 0, 0.2) inset;
}
</style>
