import React from 'react';
import Logo from '../../img/logo.svg?react';
import './style.css';
import { Link } from 'wouter';

export const Header = () =>
    <header className="main-header">
        <Link to="/">
            <Logo/>
            <h1 className="logo-title">Rhodes Island Chronicles</h1>
        </Link>
    </header>
