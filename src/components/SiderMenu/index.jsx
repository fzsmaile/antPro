import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

const SiderMenuWrapper = props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SiderMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
};

export default SiderMenuWrapper;
