import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  postionCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  borderStyling: {
    width: 300,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 5,
    // borderStyle: 'dashed',
    borderColor: '#fff',
    marginBottom: 10,
  },
  logoutBorderStyling: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    borderColor: '#fff',
  },
  headerLogostyling: {
    width: 110,
    margin: 7,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  borderDottedStyling: {
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: '#fff',
  },
  calanderStyling: {
    alignItems: 'center',
    backgroundColor: '#cccccc',
    padding: 15,
    paddingRight: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoStyling: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    width: 200,
    marginLeft: 80,
    marginBottom: 35,
    borderRadius: 10,
  },
});
