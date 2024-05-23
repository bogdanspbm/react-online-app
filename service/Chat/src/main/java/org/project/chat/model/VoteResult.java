package org.project.chat.model;

public class VoteResult {
    private String direction;
    private int count;

    public VoteResult(String direction, int count) {
        this.direction = direction;
        this.count = count;
    }

    // Getters and setters
    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
