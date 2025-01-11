package com.boot.chat.chat;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.boot.chat.vo.ChatVO;

@CrossOrigin("*")
@RequestMapping("/chat")
@RestController
public class ChatController {
    
    @Autowired
    ChatService service;

    @ResponseBody
    @RequestMapping("/getLogin")
    public List<Map<String, Object>> getLogin(ChatVO vo) {
        return service.getLogin(vo);
    }
    
    @ResponseBody
    @RequestMapping("/getMemListByName")
    public List<Map<String, Object>> getMemListByName(ChatVO vo) {
        return service.getMemListByName(vo);
    }

    @ResponseBody
    @RequestMapping("/getChatRoomList")
    public List<Map<String, Object>> getChatRoomList(ChatVO vo) {
        return service.getChatRoomListByUser(vo);
    }

    @ResponseBody
    @RequestMapping("/getMsgList")
    public List<Map<String, Object>> getMsgList(ChatVO vo) {
        return service.getMsgList(vo);
    }

    @ResponseBody
    @RequestMapping("/sendMsg")
    public Integer sendMsg(ChatVO vo) {
        return service.sendMsg(vo);
    }
}
