import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import '../../assets/css/banner.css';

const Banner = ({ appName, token }) => {
  if (token) {
    let firstDate = new Date();
    let dataProvider = [];

    for (var i = 0; i < 100; ++i) {
      var date = new Date(firstDate.getTime());

      date.setDate(i);

      dataProvider.push({
        date: date,
        value: Math.floor(Math.random() * 100)
      });
    }
    
    const config = {
      "type": "radar",
      "theme": "light",
      "dataProvider": [ {
        "AP": "Strength",
        "points": 156.9
      }, {
        "AP": "Agility",
        "points": 131.1
      }, {
        "AP": "Techinque",
        "points": 115.8
      }, {
        "AP": "Intelligence",
        "points": 109.9
      }, {
        "AP": "Social",
        "points": 108.3
      }, {
        "AP": "Luck",
        "points": 99
      } ],
      "valueAxes": [ {
        "axisTitleOffset": 20,
        "minimum": 0,
        "axisAlpha": 0.15
      } ],
      "startDuration": 2,
      "graphs": [ {
        "bullet": "round",
        "lineThickness": 2,
        "valueField": "points"
      } ],
      "categoryField": "AP",
      "titles": [{
        "text": "Ability Point",
        "size": 25
      }],
      };

    return (
      <div className="radar-chart">
        <AmCharts.React {...config} />
      </div>
    );
  }
  return (
    <div>
      <div className="cover">
        <div className="bg"></div>
        <div className="title">
          <div className="logo"></div>
          <div className="text">Got Challenges</div>
          <div className="desc">
            "Don't limit your challenges. <b>Challenge your limits.</b>"
          </div>
        </div>
      </div>

      <div className="social">
        <a href="/"  target="_blank">Facebook</a>
        <a href="/"  target="_blank">Instagram</a>
        <a href="/" target="_blank">G+</a>
      </div>
    </div>
  );
};

export default Banner;
