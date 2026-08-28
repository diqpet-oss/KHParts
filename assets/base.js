class KHPMobileNav {
  constructor() {
    this.btn = document.querySelector('[data-mobile-nav-open]');
    this.closeBtn = document.querySelector('[data-mobile-nav-close]');
    this.nav = document.querySelector('[data-mobile-nav]');
    if (!this.btn || !this.nav) return;

    this.btn.addEventListener('click', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());
    this.nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') this.close();
    });
  }

  open() {
    this.nav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.nav.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

class KHPCart {
  constructor() {
    this.drawer = document.querySelector('[data-cart-drawer]');
    this.overlay = document.querySelector('[data-overlay]');
    this.countEls = document.querySelectorAll('[data-cart-count]');
    if (!this.drawer) return;

    document.querySelectorAll('[data-cart-open]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    const closeBtns = this.drawer.querySelectorAll('[data-cart-close]');
    closeBtns.forEach((btn) => btn.addEventListener('click', () => this.close()));
    this.overlay.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open() {
    this.drawer.classList.add('is-open');
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer.classList.remove('is-open');
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  updateCount(count) {
    this.countEls.forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
}

class KHPProduct {
  constructor() {
    this.form = document.querySelector('[data-product-form]');
    if (!this.form) return;

    this.addBtn = this.form.querySelector('[type="submit"]');
    this.variants = JSON.parse(this.form.dataset.variants || '[]');

    const selects = this.form.querySelectorAll('select[data-option]');
    if (selects.length) {
      selects.forEach((select) => {
        select.addEventListener('change', () => this.sync());
      });
    }

    this.galleryThumbs = document.querySelectorAll('[data-thumb]');
    this.mainImage = document.querySelector('[data-main-image]');
    if (this.galleryThumbs.length) {
      this.galleryThumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
          this.galleryThumbs.forEach((t) => t.classList.remove('is-active'));
          thumb.classList.add('is-active');
          const src = thumb.dataset.thumb;
          if (src && this.mainImage) {
            this.mainImage.src = src;
          }
        });
      });
    }

    this.form.addEventListener('submit', (e) => this.addToCart(e));
  }

  sync() {
    const selected = {};
    this.form.querySelectorAll('select[data-option]').forEach((select) => {
      selected[select.dataset.option] = select.value;
    });

    const variant = this.variants.find((v) => {
      return v.options.every((opt) => selected[opt.name] === opt.value);
    });

    if (!variant) return;

    const priceEl = this.form.querySelector('[data-price]');
    if (priceEl) {
      priceEl.textContent = variant.price;
    }
    const compareEl = this.form.querySelector('[data-compare-price]');
    if (compareEl) {
      if (variant.compare_at_price) {
        compareEl.textContent = variant.compare_at_price;
        compareEl.style.display = 'inline';
      } else {
        compareEl.textContent = '';
        compareEl.style.display = 'none';
      }
    }

    const idSelect = this.form.querySelector('select[name="id"]');
    if (idSelect && variant.id) {
      idSelect.value = variant.id;
    }
  }

  async addToCart(e) {
    e.preventDefault();
    const btn = this.addBtn;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Adding...';

    const formData = new FormData(this.form);
    try {
      const res = await fetch(window.KHP.routes.cart_add, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Add failed');
      const cart = await res.json();
      if (cart.status === 422) throw new Error(cart.description);

      btn.textContent = 'Added ✓';
      this.updateCartCount();
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    } catch (err) {
      btn.textContent = 'Error, try again';
      console.error(err);
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
    }, 2000);
  }

  async updateCartCount() {
    try {
      const res = await fetch(`${window.KHP.routes.cart}.js`);
      const cart = await res.json();
      document.querySelectorAll('[data-cart-count]').forEach((el) => {
        el.textContent = cart.item_count;
        el.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
    } catch (err) {
      console.error(err);
    }
  }
}

class KHPVideoModal {
  constructor() {
    this.modal = document.querySelector('[data-video-modal]');
    this.iframe = this.modal && this.modal.querySelector('iframe');
    this.closeBtn = this.modal && this.modal.querySelector('[data-video-close]');
    if (!this.modal) return;

    document.querySelectorAll('[data-video-open]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const src = el.dataset.videoOpen;
        if (this.iframe) this.iframe.src = src;
        this.modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  close() {
    this.modal.classList.remove('is-open');
    if (this.iframe) this.iframe.src = '';
    document.body.style.overflow = '';
  }
}

class KHPFitment {
  constructor() {
    const forms = document.querySelectorAll('[data-fitment-form]');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => this.submit(e));
    });
  }

  submit(e) {
    e.preventDefault();
    const form = e.target;
    const year = form.querySelector('[name="year"]').value;
    const make = form.querySelector('[name="make"]').value;
    const model = form.querySelector('[name="model"]').value;
    const result = form.parentElement.querySelector('[data-fitment-result]');
    if (!result) return;

    if (!year || !make || !model) {
      result.innerHTML =
        '<div class="form-status form-status--error">Please select your vehicle year, make and model.</div>';
      return;
    }

    result.innerHTML =
      '<div class="form-status form-status--success">Great news — we have verified parts for your ' +
      year +
      ' ' +
      make +
      ' ' +
      model +
      '. Browse the categories below or contact us on WhatsApp for a fitment check.</div>';
  }
}

class KHPNewsletter {
  constructor() {
    document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = form.parentElement.querySelector('[data-newsletter-status]');
        const email = form.querySelector('input[name="contact[email]"]').value;
        if (!email) return;

        try {
          const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });
          const data = await res.json();
          if (data.form_type === 'customer') {
            status.textContent = 'Thanks! Please check your inbox to confirm.';
          } else {
            status.textContent = 'Thanks for subscribing!';
          }
        } catch (err) {
          status.textContent = 'Something went wrong, please try again.';
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new KHPMobileNav();
  new KHPCart();
  new KHPProduct();
  new KHPVideoModal();
  new KHPFitment();
  new KHPNewsletter();
});
