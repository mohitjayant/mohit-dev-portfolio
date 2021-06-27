import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import portfolioData from "./data/portfolio_shared_data.json";
import primaryLangData from "./data/res_primaryLanguage.json";
import secondryLangData from "./data/res_secondaryLanguage.json";


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumeData =
      document.documentElement.lang === window.$primaryLanguage
        ? primaryLangData
        : secondryLangData;
    this.loadResumeFromPath(resumeData);
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  componentDidMount() {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  }
  loadResumeFromPath(pathDdata){
    if(pathDdata!=null){
      this.setState({ resumeData: pathDdata });
      console.log(this.state.resumeData);
      //document.title = `${this.state.sharedData.basic_info.name}`;
    }else{
      alert("not imported Succeddfully");
    }
  }
  // loadResumeFromPath(path) {
  //   $.ajax({
  //     url: path,
  //     dataType: "json",
  //     cache: false,
  //     success: function (data) {
  //       this.setState({ resumeData: data });
  //     }.bind(this),
  //     error: function (xhr, status, err) {
  //       //alert(err);
  //     },
  //   });
  // }

  loadSharedData() {
    if(portfolioData!=null){
      this.setState({ sharedData: portfolioData });
      console.log(this.state.sharedData);
      //document.title = `${this.state.sharedData.basic_info.name}`;
    }else{
      alert("not imported Succeddfully");
    }
  }

  // loadSharedData() {
  //   $.ajax({
  //     url: `portfolio_shared_data.json`,
  //     dataType: "json",
  //     cache: false,
  //     success: function (data) {
  //       this.setState({ sharedData: data });
  //       document.title = `${this.state.sharedData.basic_info.name}`;
  //     }.bind(this),
  //     error: function (xhr, status, err) {
  //       //alert(err);
  //     },
  //   });
  // }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-india"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
