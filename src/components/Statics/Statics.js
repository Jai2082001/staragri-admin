import React from 'react'
import {  defaults, Bar, Line } from 'react-chartjs-2';
import classes from './Statics.module.css'
import titleimg from '../images/Background.png'
import { useState, useEffect } from 'react'
import {Table} from 'react-bootstrap'


defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const BarChart = () => {

  const [subAdmin, changeSubAdmin] = useState([]);
  const [products, changeProducts] = useState([]);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_FETCH_LINK}/saleStats`).then((response)=>{
      return response.json()
    }).then((response)=>{
      console.log(response)
    })
  }, [])

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_FETCH_LINK}/getSubAdmin`).then((response) => {
  //     return response.json();
  //   }).then((response) => {
  //     console.log(response)
  //     changeSubAdmin(response)
  //     fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplay`).then((response) => {
  //       return response.json()
  //     }).then((response) => {
  //       console.log(response)
  //       changeProducts(response)
  //     })
  //   })
  // }, [])

  return (
    <div className={classes.parentDiv}>
      {/* <div className={classes.staticDiv}> 
        
        <Bar data={{ labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Sales According To Product',
                data: [15, 19, 3, 5, 2, 30],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(138, 123, 170, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)', 
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={313}
          width={450}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}>

        </Bar>
        <Line
          data={{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Sales Over The Year',
                data: [12, 19, 3, 5, 30, 8],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },

            ],
          }}
          height={313}
          width={450}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Sub Admin Name</th>
            <th>Phone Number</th>
            <th>SubAdmin Email</th>
          </tr>
        </thead>
        <tbody>
          {subAdmin.map((singleItem) => {
            console.log(singleItem)
            return (
              <tr>
                <td>{ singleItem.username }</td>
                <td>{ singleItem.phonenumber }</td>
                <td>{ singleItem.email }</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((singleItem) => {
            console.log(singleItem)
            return (
              <tr>
                <td>{ singleItem.name }</td>
                <td>{ singleItem.price }</td>
                <td>{ singleItem.quantity }</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className={classes.imgContainer}>
        <img src={titleimg} alt="" />
      </div>
   */}
    </div>
  )
}

export default BarChart
