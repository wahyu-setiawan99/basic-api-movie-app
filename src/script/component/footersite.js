class FooterSite extends HTMLElement {
  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
    <div class="line-separator"></div>
    <div class="footer-section">
      <p id="copyright-site">Movie Maniac - Copyright &#169; 2022 : All right reserved</p>
      <p>This site is presented as project submission for Lintasarta Cloudeka Scholarship via Dicoding</p>
    </div>
    `;

  }

}

customElements.define('footer-site', FooterSite);