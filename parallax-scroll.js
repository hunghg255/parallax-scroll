const isElementInViewport = (el)  => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}


// Parallax scroll, mousemove
class Parallax {
  constructor(element) {
    this.element = element;
    this.speed = element.dataset.speed || 4;
    this.distance = 0;
    this.tweened = 0;
    this.run = false;

    this.direction = element.dataset.direction || 'vertical';
    this.rotate = Boolean(element.dataset.rotate) || false;
  }

  // tinh khoang cach khi scroll
  getPostionScroll() {
    const posInPage = this.getPostionInPage || 1;
    document.addEventListener('scroll', (e) => {
      const top = this.element.getBoundingClientRect().top;
      if (isElementInViewport(this.element)) {
        if (posInPage > window.scrollY) {
          this.distance = (window.scrollY / posInPage)*this.speed*50;
        }
      }
      if (top > window.innerHeight) this.distance = 0;
      if (!this.run) {
        this.updatePosition();
        this.run = true;
      }
    });
  }

  updatePosition() {
    const animate = () => {
      if (Math.abs(this.distance - this.tweened) > 0) {
        const y =  Math.floor(this.tweened += 0.09 * (this.distance - this.tweened));
        this.updateType(y);
      }
        window.requestAnimationFrame(animate);
    }
    animate();
  }

  updateType(position) {
    // vertical
    if (this.direction === 'vertical' && !this.rotate) {
      this.element.style.transform = `translate(0, ${position}px)`;
    } else if (this.direction === 'vertical' && this.rotate) {
      this.element.style.transform = `translate(0, ${position}px) rotate(${position}deg)`;
    }

    // horizontal
    if (this.direction !== 'vertical' && !this.rotate) {
      this.element.style.transform = `translate(${position}px, 0)`;
    } else if (this.direction !== 'vertical' && this.rotate) {
      this.element.style.transform = `translate(${position}px, 0) rotate(${position}deg)`;
    }
  }

  get getPostionInPage() {
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = this.element.getBoundingClientRect();
    return elemRect.top - bodyRect.top;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const childs = Array.from(document.querySelectorAll('[data-parallax-scroll]'));
  if (!childs.length) return;
  for (let i = 0, length = childs.length; i < length; i++) {
    const p = new Parallax(childs[i]);
    p.getPostionScroll();
  }
}, false);
