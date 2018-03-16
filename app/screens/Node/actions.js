import { api } from 'app/shared';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

export function fetchNode(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNode());

      let response = await api.call({
        url: `/api/v1/nodes/${nodeId}`
      });

      let node = response.data;

      dispatch(receiveNode(node));
    } catch (error) {
      console.error(error);
    }
  }
}

export function requestNode() {
  return {
    type: actionTypes.REQUEST_NODE,
    node: null,
    loadingNode: true,
  }
}

export function receiveNode(node) {
  return {
    type: actionTypes.RECEIVE_NODE,
    node: node,
    loadingNode: false,
  }
}

export function fetchProducts(filters) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestProducts());

      let url = '/api/v1/products/';

      if (filters) {
        url = url + '?' + _.map(filters, (value, type) => {
          return `${type}=${value}`;
        }).join('&');
      }

      let response = await api.call({
        url: url
      });

      let products = response.data;

      dispatch(receiveProducts(products));
    } catch (error) {
      console.error('ABC123 error!', error);
    }
  }
}

export function requestProducts() {
  return {
    type: actionTypes.REQUEST_PRODUCTS,
    products: null,
    loadingProducts: true,
  }
}

export function receiveProducts(products) {
  return {
    type: actionTypes.RECEIVE_PRODUCTS,
    products: products,
    loadingProducts: false,
  }
}

export function fetchNodeDates(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNodeDates());

      let response = await api.call({
        url: `/api/v1/nodes/${nodeId}/dates`
      });

      let dates = response.data;

      dispatch(receiveNodeDates(dates));
    } catch (error) {
      console.error(error);
    }
  }
}

export function requestNodeDates() {
  return {
    type: actionTypes.REQUEST_NODE_DATES,
    loadingDates: true,
  }
}

export function receiveNodeDates(dates) {
  return {
    type: actionTypes.RECEIVE_NODE_DATES,
    dates: dates,
    loadingDates: false,
  }
}

export function setDateFilter(date) {
  return {
    type: actionTypes.SET_DATE_FILTER,
    date: date || '',
  }
}

export function resetNode() {
  return {
    type: actionTypes.RESET_NODE,
  }
}

export function addProductToCart(data) {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCart());

      let response = await api.call({
        method: 'post',
        url: '/api/v1/users/cart',
        data: data
      });

      dispatch({
        type: actionTypes.SHOW_SUCCESS,
        title: 'Add to cart',
        message: 'Product was added to your cart'
      });

      dispatch({
        type: actionTypes.RECEIVE_CART,
        cart: response.data,
        loading: false,
        refreshing: false,
      });

    } catch (exception) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Add to cart',
        message: exception.error
      });
    }
  }
}

export function addToCart() {
  return {
    type: actionTypes.ADD_TO_CART,
    loading: true,
  }
}