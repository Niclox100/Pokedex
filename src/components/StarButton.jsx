import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from 'react'

export const StarButton = ({isFavorite, onClick}) => {
    const icon = isFavorite ? <StarFilled/> : <StarOutlined/>
  return (
    <Button icon={icon} onClick={onClick}/>
  )
}
