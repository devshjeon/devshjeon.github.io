(function(jtd, undefined) {
  jtd.addEvent = function(el, type, handler) {
    if (el.attachEvent) el.attachEvent("on" + type, handler)
    else el.addEventListener(type, handler)
  }

  function darkMode() {
    const toggleDarkMode = document.getElementById("theme-toggle")

    function dark() {
      document.body.setAttribute("data-theme", "dark")
      toggleDarkMode.innerHTML = `<svg width="18px" height="18px"><use href="#svg-moon"></use></svg>`
      localStorage.setItem("theme", "dark")
    }

    function light() {
      document.body.setAttribute("data-theme", "light")
      toggleDarkMode.innerHTML = `<svg width="18px" height="18px"><use href="#svg-sun"></use></svg>`
      localStorage.setItem("theme", "light")
    }

    function getTheme() {
      return document.body.getAttribute("data-theme") === "dark" ? "dark" : "light"
    }

    if (localStorage.getItem("theme") === "dark") {
      dark()
    } else {
      light()
    }

    jtd.addEvent(toggleDarkMode, "click", function() {
      const currentTheme = getTheme()
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      if (newTheme === "dark") {
        dark()
      } else {
        light()
      }
    })
  }

  darkMode()
})(window.jtd = window.jtd || {})