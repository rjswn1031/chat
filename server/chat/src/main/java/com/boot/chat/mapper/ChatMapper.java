package com.boot.chat.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.boot.chat.vo.ChatVO;

@Mapper
public interface ChatMapper {
    public List<Map<String, Object>> getChatRoomList();
    public List<Map<String, Object>> getChatRoomListByUser(ChatVO vo);
    public List<Map<String, Object>> getMsgList(ChatVO vo);
    public Integer sendMsg(ChatVO vo);
}
