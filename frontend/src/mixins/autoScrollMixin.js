// src/mixins/autoScrollMixin.js
export default {
  data() {
    return {
      scrollAnimationFrameId: null,
      scrollTimeoutId: null,
      isScrolling: false,
    };
  },
  mounted() {
    this.startChildRotation();
  },
  beforeUnmount() {
    this.clearScrollEffects();
  },
  watch: {
    isAutoRotateStopped(newVal) {
      if (newVal) {
        this.clearScrollEffects();
      } else {
        this.startChildRotation();
      }
    },
    activeTab(newTab, oldTab) {
      if (newTab !== oldTab) {
        const index = this.tabs.indexOf(newTab);
        if (index !== -1 && index !== this.childTabIndex) {
          this.childTabIndex = index;
          this.startChildRotation();
        }
      }
    },
    '$route.path'() {
      this.childTabIndex = 0;
      this.activeTab = this.tabs[0];
      this.startChildRotation();
    }
  },
  methods: {
    clearScrollEffects() {
      if (this.scrollAnimationFrameId) {
        cancelAnimationFrame(this.scrollAnimationFrameId);
        this.scrollAnimationFrameId = null;
      }
      if (this.scrollTimeoutId) {
        clearTimeout(this.scrollTimeoutId);
        this.scrollTimeoutId = null;
      }
      if (this.childIntervalId) {
        clearInterval(this.childIntervalId);
        this.childIntervalId = null;
      }
      this.isScrolling = false;
    },

    startChildRotation() {
      this.clearScrollEffects();
      if (this.isAutoRotateStopped) return;

      const scrollElement = document.getElementById('content-container') || document.documentElement;

      // 1. Immediately scroll to the top
      if (scrollElement === document.documentElement) {
        window.scrollTo(0, 0);
      } else {
        scrollElement.scrollTop = 0;
      }

      // 2. Wait at the top for 3 seconds to let content render and reader see it
      this.scrollTimeoutId = setTimeout(() => {
        let noScrollFrames = 0;
        
        const scrollStep = () => {
          if (this.isAutoRotateStopped) return;

          const maxScroll = scrollElement === document.documentElement
            ? scrollElement.scrollHeight - window.innerHeight
            : scrollElement.scrollHeight - scrollElement.clientHeight;

          const currentScroll = scrollElement === document.documentElement
            ? window.scrollY
            : scrollElement.scrollTop;

          if (maxScroll <= 10) {
            // Page content fits in viewport. Wait 5 seconds dynamically.
            // Using frame count to allow content to load asynchronously.
            noScrollFrames++;
            if (noScrollFrames >= 300) { // ~5 seconds at 60fps
              this.advanceToNextTab();
              return;
            }
            this.scrollAnimationFrameId = requestAnimationFrame(scrollStep);
            return;
          }

          if (currentScroll >= maxScroll - 2) {
            // Reached the bottom! Pause at bottom for 3 seconds, then advance.
            this.scrollTimeoutId = setTimeout(() => {
              this.advanceToNextTab();
            }, 3000);
            return;
          }

          // Scroll down by 1 pixel per frame
          if (scrollElement === document.documentElement) {
            window.scrollBy(0, 1);
          } else {
            scrollElement.scrollTop += 1;
          }
          this.scrollAnimationFrameId = requestAnimationFrame(scrollStep);
        };

        this.scrollAnimationFrameId = requestAnimationFrame(scrollStep);
      }, 3000);
    },

    advanceToNextTab() {
      this.clearScrollEffects();
      this.childTabIndex++;
      if (this.childTabIndex >= this.tabs.length) {
        this.childTabIndex = 0;
        this.activeTab = this.tabs[0];
        this.$emit('child-cycle-complete');
      } else {
        this.activeTab = this.tabs[this.childTabIndex];
        this.startChildRotation();
      }
    }
  }
};
