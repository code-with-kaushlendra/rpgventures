// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Hero Slider Functionality
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")

function showSlide(n) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Show current slide
  if (slides[n]) {
    slides[n].classList.add("active")
  }
  if (dots[n]) {
    dots[n].classList.add("active")
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

function changeSlide(direction) {
  if (direction === 1) {
    nextSlide()
  } else {
    prevSlide()
  }
}

function currentSlideFunc(n) {
  currentSlide = n - 1
  showSlide(currentSlide)
}

// Auto-play slider
if (slides.length > 0) {
  setInterval(nextSlide, 10000) // Change slide every 10 seconds
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for fade-in animation
document.querySelectorAll(".service-card, .vmv-card, .team-member, .client-card, .testimonial-card").forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.innerHTML = '<span class="loading"></span> Sending...'
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Add loading states to buttons
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.type === "submit") return // Skip for form submissions

    const originalText = this.textContent
    this.innerHTML = '<span class="loading"></span> Loading...'

    setTimeout(() => {
      this.textContent = originalText
    }, 1000)
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    const rate = scrolled * -0.5
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Counter animation for statistics (if you add them later)
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)
  const suffix = element.textContent.replace(/[\d]/g, "")

  const timer = setInterval(() => {
    start += increment
    const current = Math.floor(start)
    element.textContent = current + suffix

    if (start >= target) {
      element.textContent = target + suffix
      clearInterval(timer)
    }
  }, 16)
}

// Initialize counters when they come into view
const counters = document.querySelectorAll(".counter")
counters.forEach((counter) => {
  observer.observe(counter)
  counter.addEventListener("animationstart", () => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    animateCounter(counter, target)
  })
})

// Back to top button
const backToTopBtn = document.createElement("button")
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
backToTopBtn.className = "back-to-top"
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2c5aa0;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`

document.body.appendChild(backToTopBtn)

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = "1"
    backToTopBtn.style.visibility = "visible"
  } else {
    backToTopBtn.style.opacity = "0"
    backToTopBtn.style.visibility = "hidden"
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Preloader (optional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// Service cards hover effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Client logos animation
document.querySelectorAll(".client-logo").forEach((logo) => {
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) rotate(2deg)"
  })

  logo.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotate(0deg)"
  })
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add any initialization code here
  console.log("RPG Ventures website loaded successfully!")

  // Initialize AOS (Animate On Scroll) if you want to add it later
  // AOS.init();

  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu")

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active")
      }
    })

    // Toggle dropdown on mobile
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault()
        dropdown.classList.toggle("active")
      }
    })
  })

  const categoryTabs = document.querySelectorAll(".tab-btn")
  const newsCards = document.querySelectorAll(".news-card")

  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")

        const category = tab.textContent.toLowerCase().replace(" ", "-")

        // Filter news cards
        newsCards.forEach((card) => {
          const cardCategory = card.querySelector(".news-category")
          if (category === "all-news" || !cardCategory) {
            card.style.display = "block"
          } else {
            const cardCategoryText = cardCategory.textContent.toLowerCase().replace(" ", "-")
            card.style.display = cardCategoryText.includes(category.split("-")[0]) ? "block" : "none"
          }
        })
      })
    })
  }

  const searchInput = document.querySelector(".search-input")
  const filterSelects = document.querySelectorAll(".filter-select")
  const jobCards = document.querySelectorAll(".job-card")

  function filterJobs() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
    const filters = {}

    filterSelects.forEach((select) => {
      if (select.value) {
        filters[select.className] = select.value.toLowerCase()
      }
    })

    jobCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const description = card.querySelector(".job-description").textContent.toLowerCase()
      const details = card.querySelector(".job-details").textContent.toLowerCase()

      let showCard = true

      // Search filter
      if (searchTerm && !title.includes(searchTerm) && !description.includes(searchTerm)) {
        showCard = false
      }

      // Other filters can be added here based on data attributes

      card.style.display = showCard ? "block" : "none"
    })
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterJobs)
  }

  filterSelects.forEach((select) => {
    select.addEventListener("change", filterJobs)
  })

  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      submitBtn.innerHTML = '<span class="loading"></span> Subscribing...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for subscribing to our newsletter!")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  const franchiseForm = document.querySelector(".franchise-form")
  if (franchiseForm) {
    franchiseForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Basic validation
      const requiredFields = ["name", "email", "phone", "city"]
      for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
          alert(`Please fill in the ${field} field.`)
          return
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      submitBtn.innerHTML = '<span class="loading"></span> Submitting...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your franchise application! We will contact you soon.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  const careerForm = document.querySelector(".career-inquiry-form")
  if (careerForm) {
    careerForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      submitBtn.innerHTML = '<span class="loading"></span> Sending...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your inquiry! Our HR team will get back to you soon.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  const applyButtons = document.querySelectorAll(".job-card .btn-primary")
  applyButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const jobTitle = this.closest(".job-card").querySelector("h3").textContent
      alert(
        `Application for "${jobTitle}" position will open in a new window. This is a demo - integrate with your actual application system.`,
      )
    })
  })

  const saveButtons = document.querySelectorAll(".job-card .btn-secondary")
  saveButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const jobTitle = this.closest(".job-card").querySelector("h3").textContent

      if (this.textContent.includes("Save")) {
        this.textContent = "Saved"
        this.style.background = "#28a745"
        this.style.borderColor = "#28a745"
        this.style.color = "white"
        alert(`"${jobTitle}" has been saved to your favorites.`)
      } else {
        this.textContent = "Save Job"
        this.style.background = "transparent"
        this.style.borderColor = "#2c5aa0"
        this.style.color = "#2c5aa0"
        alert(`"${jobTitle}" has been removed from your favorites.`)
      }
    })
  })

  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  const statNumbers = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated")
          const target = entry.target.textContent.replace(/[^\d]/g, "")
          const targetNumber = Number.parseInt(target)
          animateCounter(entry.target, targetNumber)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })
})

// Function to show news categories (referenced in news.html)
function showCategory(category) {
  const tabs = document.querySelectorAll(".tab-btn")
  const cards = document.querySelectorAll(".news-card")

  // Update active tab
  tabs.forEach((tab) => {
    tab.classList.remove("active")
    if (tab.onclick && tab.onclick.toString().includes(category)) {
      tab.classList.add("active")
    }
  })

  // Filter cards
  cards.forEach((card) => {
    const cardCategory = card.querySelector(".news-category")
    if (category === "all" || !cardCategory) {
      card.style.display = "block"
    } else {
      const cardCategoryText = cardCategory.textContent.toLowerCase().replace(" ", "-")
      card.style.display = cardCategoryText.includes(category) ? "block" : "none"
    }
  })
}