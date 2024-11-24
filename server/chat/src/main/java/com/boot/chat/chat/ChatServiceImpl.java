package com.boot.chat.chat;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.chat.mapper.ChatMapper;
import com.boot.chat.vo.ChatVO;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatMapper mapper;

    @Override
    public List<Map<String, Object>> getChatRoomList() {
        return mapper.getChatRoomList();
    }
    
    @Override
    public List<Map<String, Object>> getChatRoomListByUser(ChatVO vo) {
        return mapper.getChatRoomListByUser(vo);
    }
    
    @Override
    public List<Map<String, Object>> getMsgList(ChatVO vo) {
        return mapper.getMsgList(vo);
    }

    @Override
    public Integer sendMsg(ChatVO vo) {
        return mapper.sendMsg(vo);
    }
}
