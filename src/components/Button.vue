<template>
  <button class="button" :class="[size, color]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      deafult: 'blue'
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.size = this.$props.large ? 'large' : this.$props.small ? 'small' : ''
  }
}
</script>

<style scoped>
.button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.button {
  display: inline-block;
  *display: inline;
  zoom: 1;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;

  background-color: #ddd;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 1)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

  transition: background-color 0.2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  border-radius: 3px;

  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);

  user-select: none;
}

.button:hover {
  background-color: #eee;
  color: #555;
}

.button:active {
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3) inset;
}

.button[disabled],
.button[disabled]:hover,
.button[disabled]:active {
  border-color: #eaeaea;
  background: #fafafa;
  cursor: default;
  position: static;
  color: #999;
  /* Usually, !important should be avoided but here it's really needed :) */
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Smaller buttons styles */

.button.small {
  padding: 4px 12px;
}

/* Larger buttons styles */

.button.large {
  padding: 12px 30px;
  text-transform: uppercase;
}

.button.large:active {
  top: 2px;
}

/* Colored buttons styles */

.button.green,
.button.red,
.button.blue {
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);

  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 0.3)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
}

/* */

.button.green {
  background-color: #57a957;
  border-color: #57a957;
}

.button.green:hover {
  background-color: #62c462;
}

.button.green:active {
  background: #57a957;
}

/* */

.button.red {
  background-color: #ca3535;
  border-color: #c43c35;
}

.button.red:hover {
  background-color: #ee5f5b;
}

.button.red:active {
  background: #c43c35;
}

/* */

.button.blue {
  background-color: #269ce9;
  border-color: #269ce9;
}

.button.blue:hover {
  background-color: #70b9e8;
}

.button.blue:active {
  background: #269ce9;
}

/* */

.green[disabled],
.green[disabled]:hover,
.green[disabled]:active {
  border-color: #57a957;
  background: #57a957;
  color: #d2ffd2;
}

.red[disabled],
.red[disabled]:hover,
.red[disabled]:active {
  border-color: #c43c35;
  background: #c43c35;
  color: #ffd3d3;
}

.blue[disabled],
.blue[disabled]:hover,
.blue[disabled]:active {
  border-color: #269ce9;
  background: #269ce9;
  color: #93d5ff;
}
</style>
