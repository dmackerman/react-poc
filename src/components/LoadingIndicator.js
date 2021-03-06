import React from 'react';
import { injectSheet } from '../utils/jss';

const styles = {
  mask: {
    background: 'rgba(255, 255, 255, 0.65)',
    borderRadius: '10px',
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    textAlign: 'center',
    width: '100%',
  },
  icon: {
    background: '#4C9ADE',
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    top: '50%',
    position: 'absolute',
    left: '50%',
    marginTop: '-25px',
    marginLeft: '-25px',
    lineHeight: '70px'
  }
};

const LoadingIndicator = (props) => {
  return (
    <div style={styles.mask}>
      <div style={styles.icon}>
        <img alt="loading" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMikiIGQ9Ik0wIDEyIFYyMCBINCBWMTJ6Ij4gCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJkIiB2YWx1ZXM9Ik0wIDEyIFYyMCBINCBWMTJ6OyBNMCA0IFYyOCBINCBWNHo7IE0wIDEyIFYyMCBINCBWMTJ6OyBNMCAxMiBWMjAgSDQgVjEyeiIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAiIGtleXRpbWVzPSIwOy4yOy41OzEiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC42IDAuNCAwLjg7MC4yIDAuOCAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAgLz4KICA8L3BhdGg+CiAgPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCkiIGQ9Ik0wIDEyIFYyMCBINCBWMTJ6Ij4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImQiIHZhbHVlcz0iTTAgMTIgVjIwIEg0IFYxMno7IE0wIDQgVjI4IEg0IFY0ejsgTTAgMTIgVjIwIEg0IFYxMno7IE0wIDEyIFYyMCBINCBWMTJ6IiBkdXI9IjEuMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4yIiBrZXl0aW1lcz0iMDsuMjsuNTsxIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44OzAuMiAwLjggMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgIC8+CiAgPC9wYXRoPgogIDxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0KSIgZD0iTTAgMTIgVjIwIEg0IFYxMnoiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZCIgdmFsdWVzPSJNMCAxMiBWMjAgSDQgVjEyejsgTTAgNCBWMjggSDQgVjR6OyBNMCAxMiBWMjAgSDQgVjEyejsgTTAgMTIgVjIwIEg0IFYxMnoiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjQiIGtleXRpbWVzPSIwOy4yOy41OzEiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC42IDAuNCAwLjg7MC4yIDAuOCAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvcGF0aD4KICA8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCkiIGQ9Ik0wIDEyIFYyMCBINCBWMTJ6Ij4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImQiIHZhbHVlcz0iTTAgMTIgVjIwIEg0IFYxMno7IE0wIDQgVjI4IEg0IFY0ejsgTTAgMTIgVjIwIEg0IFYxMno7IE0wIDEyIFYyMCBINCBWMTJ6IiBkdXI9IjEuMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC42IiBrZXl0aW1lcz0iMDsuMjsuNTsxIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuNiAwLjQgMC44OzAuMiAwLjggMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L3BhdGg+CiAgPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYpIiBkPSJNMCAxMiBWMjAgSDQgVjEyeiI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJkIiB2YWx1ZXM9Ik0wIDEyIFYyMCBINCBWMTJ6OyBNMCA0IFYyOCBINCBWNHo7IE0wIDEyIFYyMCBINCBWMTJ6OyBNMCAxMiBWMjAgSDQgVjEyeiIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuOCIga2V5dGltZXM9IjA7LjI7LjU7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC44IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K" />
      </div>
    </div>
    );
};

export default injectSheet(styles)(LoadingIndicator);
