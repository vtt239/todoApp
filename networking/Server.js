import React, {Component} from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
const apiGetAllFoods = 'http://192.168.56.1:3000/list_all_foods';
const apiInsertNewFood = 'http://192.168.56.1:3000/insert_new_foods';
const apiUpdateAFood = 'http://192.168.56.1:3000/update_a_food';

async function getFoodsFromServer() {
  try {
    let response = await fetch(apiGetAllFoods);
    let responseJson = await response.json();
    return responseJson.data; //list of foods
  } catch (error) {
    console.error(`error is: ${error}`);
  }
}

//send post request to insert new data
async function insertNewFoodToServer(params) {
  try {
    let response = await fetch(apiInsertNewFood, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function updateAFood(params) {
  try {
    let response = await fetch(apiUpdateAFood, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export {getFoodsFromServer};
export {insertNewFoodToServer};
export {updateAFood};
