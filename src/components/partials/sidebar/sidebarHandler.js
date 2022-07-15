const $ = document.querySelector.bind(document);
let isShow = false;

const showSidebar = () => {
  if (!isShow) {
    $(".overlay").style.visibility = "visible";
    $(".sidebar").style.cssText = `
    margin-left: unset;
    `;
    isShow = true;
  }
};

const hideSidebar = () => {
  if (isShow) {
    $(".overlay").style.cssText = `
    visibility: hidden;
  `;
    $(".sidebar").style.cssText = `
    margin-left: -250px;
    `;
    isShow = false;
  }
};

export { showSidebar, hideSidebar };
