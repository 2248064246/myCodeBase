<!--
 * @Author: ys4225/黄迎李
 * @Date: 2020-12-18 13:51:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-18 14:02:20
 * @Description: 
-->
<template>
  <div>
    <div class='items'>
      <div class='item'>
        <svg preserveAspectRatio='xMidYMid slice'
             viewBox='0 0 300 200'>
          <defs>
            <clipPath id='clip-0'>
              <circle cx='0'
                      cy='0'
                      fill='#000'
                      r='150px'></circle>
            </clipPath>
          </defs>
          <text class='svg-text'
                dy='.3em'
                x='50%'
                y='50%'>
            X-rays
          </text>
          <g clip-path='url(#clip-0)'>
            <image height='100%'
                   preserveAspectRatio='xMinYMin slice'
                   width='100%'
                   xlink:href='@/assets/images/Desert.jpg'></image>
            <text class='svg-masked-text'
                  dy='.3em'
                  x='50%'
                  y='50%'>
              X-rays
            </text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.effect()
  },
  methods: {
    effect () {
      var items = []
        , point = document.querySelector('svg').createSVGPoint();

      function getCoordinates (e, svg) {
        point.x = e.clientX;
        point.y = e.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
      }

      function changeColor (e) {
        document.body.className = e.currentTarget.className;
      }

      function Item (config) {
        Object.keys(config).forEach(function (item) {
          this[item] = config[item];
        }, this);
        this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
      }

      Item.prototype = {
        update: function update (c) {
          this.clip.setAttribute('cx', c.x);
          this.clip.setAttribute('cy', c.y);
        },
        mouseMoveHandler: function mouseMoveHandler (e) {
          this.update(getCoordinates(e, this.svg));
        },
        touchMoveHandler: function touchMoveHandler (e) {
          e.preventDefault();
          var touch = e.targetTouches[0];
          if (touch) return this.update(getCoordinates(touch, this.svg));
        }
      };

      [].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
        items.push(new Item({
          el: item,
          svg: item.querySelector('svg'),
          clip: document.querySelector('#clip-' + index + ' circle'),
        }));
      });

      [].slice.call(document.querySelectorAll('button'), 0).forEach(function (button) {
        button.addEventListener('click', changeColor);
      });
    }
  }
}
</script>
<style>
* {
  margin: 0;
  box-sizing: border-box;
}

:root {
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif;
  line-height: 1.618;
  font-weight: 400;
}

body {
  background-color: #2f3238;
  color: #f5f5f5;
}

a {
  color: #1abc89;
}

a:hover {
  opacity: 0.8;
}

p {
  font-size: 1.2rem;
  color: rgba(245, 245, 245, 0.5);
}

.small {
  font-size: 1rem;
  margin-top: 1em;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

header {
  text-align: center;
  padding-bottom: 3rem;
}

h1 {
  font-size: 2.6rem;
  line-height: 1.2em;
  padding-bottom: 1rem;
  font-weight: 600;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

circle {
  transform-origin: 50% 50%;

  transform: scale(0);
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

text {
  font-size: 1.1rem;
  text-transform: uppercase;
  text-anchor: middle;
  letter-spacing: 1px;
  font-weight: 600;
}

.svg-text {
  fill: #545a64;
}

.svg-masked-text {
  fill: white;
}

image {
  transform: scale(1.1);

  transform-origin: 50% 50%;
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.items {
  display: flex;

  flex-flow: row wrap;

  justify-content: center;
}

.item {
  display: flex;

  align-items: center;

  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
  margin: 5px;
  cursor: pointer;
  background-color: #3b3e46;
  border-radius: 2px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.02),
    inset 0 0px 0px 1px rgba(0, 0, 0, 0.07);

  transform: translateZ(0);
}

.item:hover circle,
.item:hover image {
  transform: scale(1);
}

button {
  width: 12px;
  height: 12px;
  border: none;

  -moz-appearance: none;
  appearance: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  border-radius: 1px;
}

button.dark {
  background-color: #2f3238;
}

button.light {
  background-color: #f9f9f9;
}

.options {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.options button {
  margin-left: 0.5rem;
}

.light {
  background-color: #f9f9f9;
  color: #1a1a1a;
}

.light p {
  color: rgba(26, 26, 26, 0.5);
}

.light .item {
  background: #f5f5f5;
}

.light .svg-text {
  fill: rgba(0, 0, 0, 0.1);
}
</style>