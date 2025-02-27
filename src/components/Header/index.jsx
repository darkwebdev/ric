import React from 'react';
import { Link } from 'wouter';
import Logo from '../../img/logo.svg?react';
import './style.css';

export const Header = ({ onClick = () => {} }) =>
    <header className="main-header" onClick={onClick}>
        <Link to="/">
            <Logo/>
            <h1 className="logo-title">Rhodes Island Chronicles</h1>
        </Link>
    </header>
