const $ = document.querySelector.bind(document);
let isShow = false;

const showSidebar = () => {
  $(".overlay").style.visibility = "visible";
  $(".sidebar").style.cssText = `
    margin-left: unset;
    `;
  isShow = true;
};

const hideSidebar = () => {
  $(".overlay").style.cssText = `
    visibility: hidden;
  `;
  $(".sidebar").style.cssText = `
    margin-left: -250px;
    `;
  isShow = false;
};

const toggleSidebar = () => {
  if (!isShow) {
    showSidebar();
  } else {
    hideSidebar();
  }
};

window.onclick = (e) => {
  if (e.target !== $(".fa-bars")) hideSidebar();
};

export default toggleSidebar;
