import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './navbar.scss';

// Nav item
const NavItem = ({ item, onItemSelect, selected = false }) => {
  return (
    <div
      className={`nav-item ${selected ? 'nav-item--selected' : ''}`}
      data-section={item.section}
      onClick={() => onItemSelect(item)}
    >
      {item.label}
    </div>
  );
};


// Nav
const Nav = ({ items, onSelectedItem, initialItemSection = null }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isHamburgerMenuActive, setIsHamburgerMenuActive] = useState(false);
  const [dashPosition, setDashPosition] = useState(0);
  const [dashWidth, setDashWidth] = useState(0);
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const navItemsRef = useRef();
  const selectedItemRef =
    	navItemsRef.current && selectedItem ?
		      navItemsRef.current.querySelector(
		      		`[data-section=${selectedItem.section}]`) : null;

  const getDashPosition = (el, dashWidth) => el ?
  		el.offsetLeft + el.offsetWidth / 2 - dashWidth / 2 : 0;
  const getDashWidth = (el) => el ? el.offsetWidth : 0;;

  const selectItem = (item) => {
    setSelectedItem(item);
    onSelectedItem(item);
  };

  // Inital item selection
  useEffect(() => {
    const initialItem = initialItemSection ?
    		items.find((item) => item.section === initialItemSection) : items[0];
    setSelectedItem(initialItem);
  }, [initialItemSection, items]);

  // Item selected
  useEffect(() => {
  	setDashWidth(getDashWidth(selectedItemRef));
  	setDashPosition(getDashPosition(selectedItemRef, dashWidth));
  }, [selectedItemRef, dashWidth]);

  // Window resized
  useLayoutEffect(() => {
  	const resizeListener = () => {
  		setBrowserWidth(window.innerWidth);
  		setDashWidth(getDashWidth(selectedItemRef));
  		setDashPosition(getDashPosition(selectedItemRef, dashWidth));
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  });

  // Browser width changed
	useEffect(() => {
		if (browserWidth > 833) {
			setIsHamburgerMenuActive(false);
		}
	},[browserWidth]);

	// Burger menu active state chagned
	useEffect(() => {
		setDashWidth(getDashWidth(selectedItemRef));
		setDashPosition(getDashPosition(selectedItemRef, dashWidth));
	}, [isHamburgerMenuActive]);

  const handleHamburgerMenuClick = (e) => {
    setIsHamburgerMenuActive(current => !current);
  };

  const renderItems = items.map((item) => (
    <NavItem
      item={item}
      key={item.section}
      onItemSelect={selectItem}
      selected={selectedItem && selectedItem.section === item.section}
    />
  ));

  return (
    <div className="nav">
    	<div className={`menu-toggler ${isHamburgerMenuActive ? 'is-active' : ''}`}>
    		<div className="hamburger-box" onClick={handleHamburgerMenuClick}>
    			<div className="hamburger-inner"></div>
    		</div>
    	</div>
      <div className="nav-items" ref={navItemsRef}>
        {renderItems}
        <div
          className="nav-dash"
          style={{
            width: dashWidth,
            transform: `translate3d(${dashPosition}px, 1px , 0)`
          }}
        />
      </div>
    </div>
  );
};

export default Nav;
