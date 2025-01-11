package com.boot.chat.chat;

import java.util.List;
import java.util.Map;

import com.boot.chat.vo.ChatVO;

public interface ChatService {
    public List<Map<String, Object>> getLogin(ChatVO vo);
    
    public List<Map<String, Object>> getMemListByName(ChatVO vo);

    public List<Map<String, Object>> getChatRoomList();
    public List<Map<String, Object>> getChatRoomListByUser(ChatVO vo);
    
    public List<Map<String, Object>> getMsgList(ChatVO vo);

    public Integer sendMsg(ChatVO vo);
}
