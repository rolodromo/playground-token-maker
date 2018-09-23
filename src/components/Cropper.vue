<template>
  <div>

    <div class="container">
      <div class="left-half">
        <v-btn-group>
          <v-btn color="red" @click.native="$refs.myFiles.click()"><i class="fas fa-file-upload"></i> Upload</v-btn>
          <v-btn color="blue" @click.native="rotate(-90)"><i class="fas fa-undo"></i></v-btn>
          <v-btn color="blue" @click.native="rotate(90)"><i class="fas fa-redo"></i></v-btn>
          <v-btn color="green" @click.native="saveImage"><i class="fas fa-download"></i> Save</v-btn>
        </v-btn-group>

        <input type="file"
               @change="previewFiles"
               ref="myFiles"
               accept="image/png, image/jpeg"
               style="display: none;"
        />
        <div class="croppie">
          <vue-croppie
            ref=croppieRef
            :enableOrientation="true"
            :enableResize="false"
            :viewport="{ width: 300, height: 300, type: 'circle' }"
            :showZoomer="true"
            @result="result"
            @update="crop"
          >
          </vue-croppie>
        </div>

      </div>
      <div class="right-half">
        <div class="container">
          <div class="left-half" style="flex: 0.1; ">
            <span>color</span>
            <swatches v-model="color"  colors="text-advanced"
                      :trigger-style="{ width: '32px', height: '32px', borderRadius: '3px',  padding: '0px 0px' }"
                      popover-to="left"
                      show-border></swatches>
          </div>
          <div class="right-half">
            <div>
              <span>FRAMES</span>
              <v-btn-group>
                <v-btn v-for="(_, name, idx) in FRAMES" :key="idx" color="blue" @click.native="changeFrame(name)">{{idx+1}}</v-btn>
              </v-btn-group>
            </div>
          </div>

        </div>

        <div>
          <canvas id="userImg" ref="userImg" :width="width" :height="height"></canvas>
          <canvas id="overlay" ref="overlay" :width="width" :height="height"></canvas>
          <canvas id="combined" ref="combined" :width="width" :height="height"></canvas>
          <div class="cover" :style="coverStyles"></div>
          <a ref="downloader"></a>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import VBtn from './Button'
  import VBtnGroup from './ButtonGroup'
  import Swatches from 'vue-swatches'
  import "vue-swatches/dist/vue-swatches.min.css"

  const FRAMES = {
    circle1: {
      src: '/static/img/circle_frame_1.png',
      size: { width: 512, height: 512 },
      rect: [35, 30, 440, 440],
      brightness: { r: 0.2, g: 0.2, b: 0.2 }

    },
    circle3: {
      src: '/static/img/circle_frame_3.png',
      size: { width: 512, height: 512 },
      rect: [35, 35, 440, 440],
      brightness: { r: 0.2, g: 0.2, b: 0.2 }
    },
    circle4: {
      src: '/static/img/circle_frame_4.png',
      size: { width: 500, height: 500 },
      rect: [25, 25, 450, 450],
      brightness: { r: 0.3, g: 0.3, b: 0.1 }
    },

    circle5: {
      src: '/static/img/circle_frame_5.png',
      size: { width: 512, height: 512 },
      rect: [75,75, 365, 365],
      brightness: { r: 0.3, g: 0.5, b: 0.5 }

    },
    circle6: {
      src: '/static/img/circle_frame_6.png',
      size: { width: 512, height: 512 },
      rect: [35, 35, 440, 440],
      brightness: { r: 0.3, g: 0.5, b: 0.5 }

    }
  }

  export default {
    components: {
      VBtn,
      VBtnGroup,
      Swatches
    },
    mounted() {
      this.resize()
      this.drawOverlay()
      this.bind()
    },
    data() {
      const name = 'circle4'
      return {
        FRAMES,
        frameName: name,
        width: '',
        height: '',
        coverStyles: {
          width: '',
          height: '',
        },
        cropped: null,
        uploadedUrl: 'http://hbimg.b0.upaiyun.com/bda0df2067833be91bc4809bfbbfe5ae9b353a64121e2-crHsAo',
        color: '#615192',
        colors: [
          ['#0D2700', '#1B4C00', '#349500', '#3CAD00' ],
          ['#2C2900', '#575100', '#ABA000', '#C7BA00' ],
          ['#3a1111', '#560c0c', '#AD0000', '#D10000' ],
          ['#13073a', '#261758', '#615192', '#887caf' ],
          ['#2C1900', '#573200', '#AB6200', '#C77200' ]
        ],
        defaultBrightness: { r: 0.1, g: 0.1, b: 0.1 }
      }
    },
    watch: {
      color() {
        this.drawOverlay()
      },
      frameName() {
        this.resize()
        this.drawOverlay()
        this.crop()
      }
    },
    computed: {
      croppie() {
        return this.$refs.croppieRef
      },
      userImg() {
        return this.$refs.userImg
      },
      overlay() {
        return this.$refs.overlay
      },
      combined() {
        return this.$refs.combined
      },
      userImgCtx() {
        return this.$refs.userImg.getContext('2d')
      },
      overlayCtx() {
        return this.$refs.overlay.getContext('2d')
      },
      combinedCtx() {
        return this.$refs.combined.getContext('2d')
      },
      placeholder() {
        return FRAMES[this.frameName].rect
      },
      frameSize() {
        return FRAMES[this.frameName].size
      },
      frame() {
        return FRAMES[this.frameName]
      },
      brightness() {
        return FRAMES[this.frameName].brightness || this.defaultBrightness
      }
    },
    methods: {
      resize() {
        this.width = this.frameSize.width
        this.height = this.frameSize.height
        this.coverStyles = {
          width: `${this.frameSize.width}px`,
          height: `${this.frameSize.height}px`
        }
      },
      async drawOverlay() {
        const imageObj = await this.loadImg(this.frame.src)

        this.overlay.width = this.width
        this.overlay.height = this.height
        this.overlayCtx.drawImage(imageObj, 0, 0)
        this.colorImage(this.overlayCtx, this.brightness, this.color)
      },
      changeFrame(frame) {
        if (frame === this.frameName) return

        this.frameName = frame
      },
      crop() {
        this.croppie.result({
          format: 'png',
          circle: true,
          type: 'rawcanvas'
        })
      },
      async result(output) {
        this.userImgCtx.clearRect(0, 0, this.userImg.width, this.userImg.height)
        this.userImgCtx.drawImage(output, ...this.placeholder)
      },
      async loadImg(src) {
        const imageObj = new Image()
        return new Promise((resolve, reject) => {
          imageObj.onload = () => resolve(imageObj)
          imageObj.onerror = reject
          imageObj.src = src
        })
      },
      rotate(rotationAngle) {
        this.croppie.rotate(rotationAngle)
      },
      async bind() {
        await this.croppie.bind({
          url: this.uploadedUrl
        })
        this.crop()
      },
      previewFiles(ev) {
        const files = ev.target.files
        if (files && files[0]) {
          const reader = new FileReader()

          reader.onload = async (e) => {
            this.uploadedUrl = e.target.result
            this.bind()
            this.crop()
          }

          reader.readAsDataURL(files[0])
        }
      },
      saveImage() {
        this.combinedCtx.drawImage(this.userImg, 0, 0)
        this.combinedCtx.drawImage(this.overlay, 0, 0)
        this.cropped = this.combined.toDataURL('image/png', 1)

        const link = this.$refs.downloader
        link.href = this.cropped
        link.download = 'token.png'
        link.click()
        this.combinedCtx.clearRect(0, 0, this.combined.width, this.combined.height)
      },

      colorImage(ctx, brightness, hexColor) {

        const imageData = ctx.getImageData(0, 0, this.width, this.height)
        const data = imageData.data

        const rgbColor = this.hexToRgb(hexColor)

        for (var p = 0, len = data.length; p < len; p += 4) {
          if (data[p + 3] === 0) continue

          const bLevel = brightness.r * data[p] + brightness.g * data[p + 1] + brightness.b * data[p + 2]
          data[p] = bLevel + rgbColor.r
          data[p + 1] = bLevel + rgbColor.g
          data[p + 2] = bLevel + rgbColor.b
        }
        ctx.putImageData(imageData, 0, 0)

      },
      hexToRgb(color) {
        color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : {
          r: 0,
          g: 0,
          b: 0
        };
      }
    }
  }

</script>

<style scoped>
  .container {
    display: flex;
    justify-content: start;
  }

  .croppie {
    padding-top: 1em;
  }

  .left-half {
    flex: 1;
    padding: 1rem;
  }

  .right-half {
    flex: 1;
    padding: 1rem;
    position: relative;
    text-align: center;
  }

  #userImg, #overlay, #combined, .cover {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 7em;
  }

  #combined {
    display: none;
  }
</style>
