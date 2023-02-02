import * as feather from "./react-feather"

export const version = "4.29.0"

export const manifest: Record<keyof typeof feather, { tags: string[], more: (keyof typeof feather)[] }> = {
  "Activity": {
    "tags": [
      "pulse",
      "health",
      "action",
      "motion"
    ],
    "more": []
  },
  "Airplay": {
    "tags": [
      "stream",
      "cast",
      "mirroring"
    ],
    "more": [
      "Cast"
    ]
  },
  "AlertCircle": {
    "tags": [
      "warning",
      "alert",
      "danger"
    ],
    "more": [
      "AlertOctagon",
      "AlertTriangle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "XCircle",
      "XOctagon"
    ]
  },
  "AlertOctagon": {
    "tags": [
      "warning",
      "alert",
      "danger"
    ],
    "more": [
      "AlertCircle",
      "AlertTriangle",
      "Octagon",
      "XOctagon"
    ]
  },
  "AlertTriangle": {
    "tags": [
      "warning",
      "alert",
      "danger"
    ],
    "more": [
      "AlertCircle",
      "AlertOctagon",
      "Triangle",
      "XOctagon"
    ]
  },
  "AlignCenter": {
    "tags": [
      "text alignment",
      "center"
    ],
    "more": [
      "AlignJustify",
      "AlignLeft",
      "AlignRight"
    ]
  },
  "AlignJustify": {
    "tags": [
      "text alignment",
      "justified"
    ],
    "more": [
      "AlignCenter",
      "AlignLeft",
      "AlignRight"
    ]
  },
  "AlignLeft": {
    "tags": [
      "text alignment",
      "left"
    ],
    "more": [
      "AlignCenter",
      "AlignJustify",
      "AlignRight",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "ToggleLeft"
    ]
  },
  "AlignRight": {
    "tags": [
      "text alignment",
      "right"
    ],
    "more": [
      "AlignCenter",
      "AlignJustify",
      "AlignLeft",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "ToggleRight"
    ]
  },
  "Anchor": {
    "tags": [],
    "more": []
  },
  "Aperture": {
    "tags": [
      "camera",
      "photo"
    ],
    "more": []
  },
  "Archive": {
    "tags": [
      "index",
      "box"
    ],
    "more": []
  },
  "ArrowDownCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "ChevronDown",
      "Circle",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "HelpCircle",
      "LogIn",
      "LogOut",
      "MessageCircle",
      "MousePointer",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "RotateCcw",
      "RotateCw",
      "StopCircle",
      "ThumbsDown",
      "XCircle"
    ]
  },
  "ArrowDownLeft": {
    "tags": [],
    "more": [
      "AlignLeft",
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsDown",
      "ToggleLeft"
    ]
  },
  "ArrowDownRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsDown",
      "ToggleRight"
    ]
  },
  "ArrowDown": {
    "tags": [],
    "more": [
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsDown"
    ]
  },
  "ArrowLeftCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "AlignLeft",
      "Circle",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "HelpCircle",
      "LogIn",
      "LogOut",
      "MessageCircle",
      "MousePointer",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "RotateCcw",
      "RotateCw",
      "StopCircle",
      "ToggleLeft",
      "XCircle"
    ]
  },
  "ArrowLeft": {
    "tags": [],
    "more": [
      "AlignLeft",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ToggleLeft"
    ]
  },
  "ArrowRightCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "AlignRight",
      "Circle",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "HelpCircle",
      "LogIn",
      "LogOut",
      "MessageCircle",
      "MousePointer",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "RotateCcw",
      "RotateCw",
      "StopCircle",
      "ToggleRight",
      "XCircle"
    ]
  },
  "ArrowRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ToggleRight"
    ]
  },
  "ArrowUpCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "ChevronUp",
      "Circle",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "HelpCircle",
      "LogIn",
      "LogOut",
      "MessageCircle",
      "MousePointer",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "RotateCcw",
      "RotateCw",
      "StopCircle",
      "ThumbsUp",
      "XCircle"
    ]
  },
  "ArrowUpLeft": {
    "tags": [],
    "more": [
      "AlignLeft",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsUp",
      "ToggleLeft"
    ]
  },
  "ArrowUpRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsUp",
      "ToggleRight"
    ]
  },
  "ArrowUp": {
    "tags": [],
    "more": [
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ThumbsUp"
    ]
  },
  "AtSign": {
    "tags": [
      "mention",
      "at",
      "email",
      "message"
    ],
    "more": [
      "DollarSign"
    ]
  },
  "Award": {
    "tags": [
      "achievement",
      "badge"
    ],
    "more": []
  },
  "BarChart2": {
    "tags": [
      "statistics",
      "diagram",
      "graph"
    ],
    "more": [
      "BarChart",
      "Edit2",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "PieChart",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "BarChart": {
    "tags": [
      "statistics",
      "diagram",
      "graph"
    ],
    "more": [
      "BarChart2",
      "PieChart"
    ]
  },
  "BatteryCharging": {
    "tags": [
      "power",
      "electricity"
    ],
    "more": [
      "Battery"
    ]
  },
  "Battery": {
    "tags": [
      "power",
      "electricity"
    ],
    "more": [
      "BatteryCharging"
    ]
  },
  "BellOff": {
    "tags": [
      "alarm",
      "notification",
      "silent"
    ],
    "more": [
      "Bell",
      "Circle",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "Bell": {
    "tags": [
      "alarm",
      "notification",
      "sound"
    ],
    "more": [
      "BellOff"
    ]
  },
  "Bluetooth": {
    "tags": [
      "wireless"
    ],
    "more": []
  },
  "Bold": {
    "tags": [],
    "more": []
  },
  "BookOpen": {
    "tags": [
      "read",
      "library"
    ],
    "more": [
      "Book"
    ]
  },
  "Book": {
    "tags": [
      "read",
      "dictionary",
      "booklet",
      "magazine",
      "library"
    ],
    "more": [
      "BookOpen"
    ]
  },
  "Bookmark": {
    "tags": [
      "read",
      "clip",
      "marker",
      "tag"
    ],
    "more": [
      "Star"
    ]
  },
  "Box": {
    "tags": [
      "cube"
    ],
    "more": [
      "Archive",
      "Gift",
      "Package"
    ]
  },
  "Briefcase": {
    "tags": [
      "work",
      "bag",
      "baggage",
      "folder"
    ],
    "more": []
  },
  "Calendar": {
    "tags": [
      "date"
    ],
    "more": []
  },
  "CameraOff": {
    "tags": [],
    "more": [
      "Aperture",
      "BellOff",
      "Camera",
      "Circle",
      "EyeOff",
      "Instagram",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "Video",
      "WifiOff",
      "ZapOff",
      "Zap"
    ]
  },
  "Camera": {
    "tags": [
      "photo"
    ],
    "more": [
      "Aperture",
      "Instagram",
      "VideoOff",
      "Video",
      "ZapOff",
      "Zap"
    ]
  },
  "Cast": {
    "tags": [
      "chromecast",
      "airplay"
    ],
    "more": [
      "Airplay"
    ]
  },
  "CheckCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "UserCheck",
      "XCircle"
    ]
  },
  "CheckSquare": {
    "tags": [],
    "more": [
      "MessageSquare",
      "PlusSquare",
      "UserCheck",
      "XSquare"
    ]
  },
  "Check": {
    "tags": [],
    "more": [
      "UserCheck"
    ]
  },
  "ChevronDown": {
    "tags": [
      "expand"
    ],
    "more": [
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerRightDown",
      "ThumbsDown"
    ]
  },
  "ChevronLeft": {
    "tags": [],
    "more": [
      "AlignLeft",
      "ChevronDown",
      "ChevronUp",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "ToggleLeft"
    ]
  },
  "ChevronRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "ChevronDown",
      "ChevronUp",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "ToggleRight"
    ]
  },
  "ChevronUp": {
    "tags": [
      "collapse"
    ],
    "more": [
      "ChevronDown",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp"
    ]
  },
  "ChevronsDown": {
    "tags": [],
    "more": [
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerRightDown",
      "ThumbsDown"
    ]
  },
  "ChevronsLeft": {
    "tags": [],
    "more": [
      "AlignLeft",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "ToggleLeft"
    ]
  },
  "ChevronsRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "ToggleRight"
    ]
  },
  "ChevronsUp": {
    "tags": [],
    "more": [
      "ChevronUp",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp"
    ]
  },
  "Chrome": {
    "tags": [],
    "more": []
  },
  "Circle": {
    "tags": [
      "off",
      "zero",
      "record"
    ],
    "more": [
      "AlertCircle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "XCircle"
    ]
  },
  "Clipboard": {
    "tags": [
      "copy"
    ],
    "more": []
  },
  "Clock": {
    "tags": [
      "time",
      "watch",
      "alarm"
    ],
    "more": [
      "Watch"
    ]
  },
  "CloudDrizzle": {
    "tags": [
      "weather",
      "shower"
    ],
    "more": [
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud"
    ]
  },
  "CloudLightning": {
    "tags": [
      "weather",
      "bolt"
    ],
    "more": [
      "CloudDrizzle",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "ZapOff",
      "Zap"
    ]
  },
  "CloudOff": {
    "tags": [],
    "more": [
      "BellOff",
      "Circle",
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "CloudRain": {
    "tags": [
      "weather"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudSnow",
      "Cloud",
      "Umbrella"
    ]
  },
  "CloudSnow": {
    "tags": [
      "weather",
      "blizzard"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "Cloud"
    ]
  },
  "Cloud": {
    "tags": [
      "weather"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow"
    ]
  },
  "Code": {
    "tags": [
      "source",
      "programming"
    ],
    "more": [
      "GitBranch",
      "GitCommit",
      "GitMerge",
      "GitPullRequest",
      "Terminal"
    ]
  },
  "Codepen": {
    "tags": [
      "logo"
    ],
    "more": []
  },
  "Codesandbox": {
    "tags": [
      "logo"
    ],
    "more": []
  },
  "Coffee": {
    "tags": [
      "drink",
      "cup",
      "mug",
      "tea",
      "cafe",
      "hot",
      "beverage"
    ],
    "more": []
  },
  "Columns": {
    "tags": [
      "layout"
    ],
    "more": []
  },
  "Command": {
    "tags": [
      "keyboard",
      "cmd",
      "terminal",
      "prompt"
    ],
    "more": []
  },
  "Compass": {
    "tags": [
      "navigation",
      "safari",
      "travel",
      "direction"
    ],
    "more": []
  },
  "Copy": {
    "tags": [
      "clone",
      "duplicate"
    ],
    "more": [
      "Clipboard"
    ]
  },
  "CornerDownLeft": {
    "tags": [
      "arrow",
      "return"
    ],
    "more": [
      "AlignLeft",
      "ChevronDown",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsDown",
      "ToggleLeft"
    ]
  },
  "CornerDownRight": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignRight",
      "ChevronDown",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsDown",
      "ToggleRight"
    ]
  },
  "CornerLeftDown": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignLeft",
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsDown",
      "ToggleLeft"
    ]
  },
  "CornerLeftUp": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignLeft",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp",
      "ToggleLeft"
    ]
  },
  "CornerRightDown": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignRight",
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsDown",
      "ToggleRight"
    ]
  },
  "CornerRightUp": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignRight",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp",
      "ToggleRight"
    ]
  },
  "CornerUpLeft": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignLeft",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "ThumbsUp",
      "ToggleLeft"
    ]
  },
  "CornerUpRight": {
    "tags": [
      "arrow"
    ],
    "more": [
      "AlignRight",
      "ChevronUp",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "ThumbsUp",
      "ToggleRight"
    ]
  },
  "Cpu": {
    "tags": [
      "processor",
      "technology"
    ],
    "more": []
  },
  "CreditCard": {
    "tags": [
      "purchase",
      "payment",
      "cc"
    ],
    "more": []
  },
  "Crop": {
    "tags": [
      "photo",
      "image"
    ],
    "more": []
  },
  "Crosshair": {
    "tags": [
      "aim",
      "target"
    ],
    "more": []
  },
  "Database": {
    "tags": [
      "storage",
      "memory"
    ],
    "more": []
  },
  "Delete": {
    "tags": [
      "remove"
    ],
    "more": [
      "FileMinus",
      "Trash",
      "Trash2",
      "UserMinus",
      "UserX",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
    ]
  },
  "Disc": {
    "tags": [
      "album",
      "cd",
      "dvd",
      "music"
    ],
    "more": []
  },
  "DivideCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "XCircle"
    ]
  },
  "DivideSquare": {
    "tags": [],
    "more": [
      "MessageSquare",
      "PlusSquare",
      "XSquare"
    ]
  },
  "Divide": {
    "tags": [],
    "more": []
  },
  "DollarSign": {
    "tags": [
      "currency",
      "money",
      "payment"
    ],
    "more": [
      "AtSign"
    ]
  },
  "DownloadCloud": {
    "tags": [],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud"
    ]
  },
  "Download": {
    "tags": [],
    "more": []
  },
  "Dribbble": {
    "tags": [],
    "more": []
  },
  "Droplet": {
    "tags": [
      "water"
    ],
    "more": []
  },
  "Edit2": {
    "tags": [
      "pencil",
      "change"
    ],
    "more": [
      "BarChart2",
      "Edit",
      "Edit3",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Settings",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "Edit3": {
    "tags": [
      "pencil",
      "change"
    ],
    "more": [
      "Edit",
      "Edit2",
      "Settings"
    ]
  },
  "Edit": {
    "tags": [
      "pencil",
      "change"
    ],
    "more": [
      "Edit2",
      "Edit3",
      "Settings"
    ]
  },
  "ExternalLink": {
    "tags": [
      "outbound"
    ],
    "more": [
      "Link",
      "Link2"
    ]
  },
  "EyeOff": {
    "tags": [
      "view",
      "watch",
      "hide",
      "hidden"
    ],
    "more": [
      "BellOff",
      "Circle",
      "Eye",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "Eye": {
    "tags": [
      "view",
      "watch"
    ],
    "more": [
      "EyeOff"
    ]
  },
  "Facebook": {
    "tags": [
      "logo",
      "social"
    ],
    "more": []
  },
  "FastForward": {
    "tags": [
      "music"
    ],
    "more": [
      "SkipForward"
    ]
  },
  "Feather": {
    "tags": [],
    "more": []
  },
  "Figma": {
    "tags": [
      "logo",
      "design",
      "tool"
    ],
    "more": []
  },
  "FileMinus": {
    "tags": [
      "delete",
      "remove",
      "erase"
    ],
    "more": [
      "FilePlus",
      "FileText",
      "FolderMinus",
      "Minus",
      "UserMinus"
    ]
  },
  "FilePlus": {
    "tags": [
      "add",
      "create",
      "new"
    ],
    "more": [
      "FileMinus",
      "FileText",
      "FolderPlus",
      "Plus",
      "PlusCircle",
      "PlusSquare",
      "UserPlus"
    ]
  },
  "FileText": {
    "tags": [
      "data",
      "txt",
      "pdf"
    ],
    "more": [
      "FileMinus",
      "FilePlus",
      "Type"
    ]
  },
  "File": {
    "tags": [],
    "more": [
      "FileMinus",
      "FilePlus",
      "FileText"
    ]
  },
  "Film": {
    "tags": [
      "movie",
      "video"
    ],
    "more": [
      "VideoOff",
      "Video"
    ]
  },
  "Filter": {
    "tags": [
      "funnel",
      "hopper"
    ],
    "more": []
  },
  "Flag": {
    "tags": [
      "report"
    ],
    "more": []
  },
  "FolderMinus": {
    "tags": [
      "directory"
    ],
    "more": [
      "Briefcase",
      "FileMinus",
      "FolderPlus",
      "Folder",
      "Minus",
      "UserMinus"
    ]
  },
  "FolderPlus": {
    "tags": [
      "directory"
    ],
    "more": [
      "Briefcase",
      "FilePlus",
      "FolderMinus",
      "Folder",
      "Plus",
      "PlusCircle",
      "PlusSquare",
      "UserPlus"
    ]
  },
  "Folder": {
    "tags": [
      "directory"
    ],
    "more": [
      "Briefcase",
      "FolderMinus",
      "FolderPlus"
    ]
  },
  "Framer": {
    "tags": [
      "logo",
      "design",
      "tool"
    ],
    "more": []
  },
  "Frown": {
    "tags": [
      "emoji",
      "face",
      "bad",
      "sad",
      "emotion"
    ],
    "more": []
  },
  "Gift": {
    "tags": [
      "present",
      "box",
      "birthday",
      "party"
    ],
    "more": []
  },
  "GitBranch": {
    "tags": [
      "code",
      "version control"
    ],
    "more": [
      "GitCommit",
      "GitMerge",
      "GitPullRequest"
    ]
  },
  "GitCommit": {
    "tags": [
      "code",
      "version control"
    ],
    "more": [
      "GitBranch",
      "GitMerge",
      "GitPullRequest"
    ]
  },
  "GitMerge": {
    "tags": [
      "code",
      "version control"
    ],
    "more": [
      "GitBranch",
      "GitCommit",
      "GitPullRequest"
    ]
  },
  "GitPullRequest": {
    "tags": [
      "code",
      "version control"
    ],
    "more": [
      "GitBranch",
      "GitCommit",
      "GitMerge"
    ]
  },
  "Github": {
    "tags": [
      "logo",
      "version control"
    ],
    "more": []
  },
  "Gitlab": {
    "tags": [
      "logo",
      "version control"
    ],
    "more": []
  },
  "Globe": {
    "tags": [
      "world",
      "browser",
      "language",
      "translate"
    ],
    "more": []
  },
  "Grid": {
    "tags": [],
    "more": []
  },
  "HardDrive": {
    "tags": [
      "computer",
      "server",
      "memory",
      "data"
    ],
    "more": []
  },
  "Hash": {
    "tags": [
      "hashtag",
      "number",
      "pound"
    ],
    "more": []
  },
  "Headphones": {
    "tags": [
      "music",
      "audio",
      "sound"
    ],
    "more": []
  },
  "Heart": {
    "tags": [
      "like",
      "love",
      "emotion"
    ],
    "more": []
  },
  "HelpCircle": {
    "tags": [
      "question mark"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "LifeBuoy",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "XCircle"
    ]
  },
  "Hexagon": {
    "tags": [
      "shape",
      "node.js",
      "logo"
    ],
    "more": []
  },
  "Home": {
    "tags": [
      "house",
      "living"
    ],
    "more": []
  },
  "Image": {
    "tags": [
      "picture"
    ],
    "more": [
      "Crop"
    ]
  },
  "Inbox": {
    "tags": [
      "email"
    ],
    "more": []
  },
  "Info": {
    "tags": [],
    "more": []
  },
  "Instagram": {
    "tags": [
      "logo",
      "camera"
    ],
    "more": []
  },
  "Italic": {
    "tags": [],
    "more": []
  },
  "Key": {
    "tags": [
      "password",
      "login",
      "authentication",
      "secure"
    ],
    "more": []
  },
  "Layers": {
    "tags": [
      "stack"
    ],
    "more": []
  },
  "Layout": {
    "tags": [
      "window",
      "webpage"
    ],
    "more": [
      "Columns"
    ]
  },
  "LifeBuoy": {
    "tags": [
      "help",
      "life ring",
      "support"
    ],
    "more": []
  },
  "Link2": {
    "tags": [
      "chain",
      "url"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "ExternalLink",
      "Link",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "Link": {
    "tags": [
      "chain",
      "url"
    ],
    "more": [
      "ExternalLink",
      "Link2"
    ]
  },
  "Linkedin": {
    "tags": [
      "logo",
      "social media"
    ],
    "more": []
  },
  "List": {
    "tags": [
      "options"
    ],
    "more": []
  },
  "Loader": {
    "tags": [],
    "more": []
  },
  "Lock": {
    "tags": [
      "security",
      "password",
      "secure"
    ],
    "more": []
  },
  "LogIn": {
    "tags": [
      "sign in",
      "arrow",
      "enter"
    ],
    "more": [
      "LogOut",
      "ZoomIn"
    ]
  },
  "LogOut": {
    "tags": [
      "sign out",
      "arrow",
      "exit"
    ],
    "more": [
      "LogIn",
      "ZoomOut"
    ]
  },
  "Mail": {
    "tags": [
      "email",
      "message"
    ],
    "more": [
      "Send"
    ]
  },
  "MapPin": {
    "tags": [
      "location",
      "navigation",
      "travel",
      "marker"
    ],
    "more": [
      "Map"
    ]
  },
  "Map": {
    "tags": [
      "location",
      "navigation",
      "travel"
    ],
    "more": [
      "MapPin"
    ]
  },
  "Maximize2": {
    "tags": [
      "fullscreen",
      "arrows",
      "expand"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "Link2",
      "Maximize",
      "Minimize2",
      "Navigation2",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "Maximize": {
    "tags": [
      "fullscreen"
    ],
    "more": [
      "Maximize2"
    ]
  },
  "Meh": {
    "tags": [
      "emoji",
      "face",
      "neutral",
      "emotion"
    ],
    "more": []
  },
  "Menu": {
    "tags": [
      "bars",
      "navigation",
      "hamburger"
    ],
    "more": []
  },
  "MessageCircle": {
    "tags": [
      "comment",
      "chat"
    ],
    "more": [
      "AlertCircle",
      "AtSign",
      "Circle",
      "HelpCircle",
      "Mail",
      "MessageSquare",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "Send",
      "StopCircle",
      "XCircle"
    ]
  },
  "MessageSquare": {
    "tags": [
      "comment",
      "chat"
    ],
    "more": [
      "AtSign",
      "Mail",
      "MessageCircle",
      "PlusSquare",
      "Send",
      "XSquare"
    ]
  },
  "MicOff": {
    "tags": [
      "record",
      "sound",
      "mute"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "Mic",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "Mic": {
    "tags": [
      "record",
      "sound",
      "listen"
    ],
    "more": [
      "MicOff"
    ]
  },
  "Minimize2": {
    "tags": [
      "exit fullscreen",
      "arrows",
      "close"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "Link2",
      "Maximize2",
      "Minimize",
      "Navigation2",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "Minimize": {
    "tags": [
      "exit fullscreen",
      "close"
    ],
    "more": [
      "Minimize2"
    ]
  },
  "MinusCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "Circle",
      "FileMinus",
      "FolderMinus",
      "HelpCircle",
      "MessageCircle",
      "Minus",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "UserMinus",
      "XCircle"
    ]
  },
  "MinusSquare": {
    "tags": [],
    "more": [
      "FileMinus",
      "FolderMinus",
      "MessageSquare",
      "Minus",
      "PlusSquare",
      "UserMinus",
      "XSquare"
    ]
  },
  "Minus": {
    "tags": [
      "subtract"
    ],
    "more": [
      "FileMinus",
      "FolderMinus",
      "UserMinus"
    ]
  },
  "Monitor": {
    "tags": [
      "tv",
      "screen",
      "display"
    ],
    "more": []
  },
  "Moon": {
    "tags": [
      "dark",
      "night"
    ],
    "more": []
  },
  "MoreHorizontal": {
    "tags": [
      "ellipsis"
    ],
    "more": [
      "MoreVertical"
    ]
  },
  "MoreVertical": {
    "tags": [
      "ellipsis"
    ],
    "more": [
      "MoreHorizontal"
    ]
  },
  "MousePointer": {
    "tags": [
      "arrow",
      "cursor"
    ],
    "more": []
  },
  "Move": {
    "tags": [
      "arrows"
    ],
    "more": []
  },
  "Music": {
    "tags": [
      "note"
    ],
    "more": [
      "Disc",
      "FastForward",
      "Headphones",
      "Pause",
      "PauseCircle",
      "Play",
      "PlayCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
  },
  "Navigation2": {
    "tags": [
      "location",
      "travel"
    ],
    "more": [
      "BarChart2",
      "Compass",
      "Edit2",
      "Link2",
      "MapPin",
      "Map",
      "Maximize2",
      "Menu",
      "Minimize2",
      "Navigation",
      "Share2",
      "Trash2",
      "Volume2"
    ]
  },
  "Navigation": {
    "tags": [
      "location",
      "travel"
    ],
    "more": [
      "Compass",
      "MapPin",
      "Map",
      "Menu",
      "Navigation2"
    ]
  },
  "Octagon": {
    "tags": [
      "stop"
    ],
    "more": [
      "AlertOctagon",
      "XOctagon"
    ]
  },
  "Package": {
    "tags": [
      "box",
      "container"
    ],
    "more": []
  },
  "Paperclip": {
    "tags": [
      "attachment"
    ],
    "more": []
  },
  "PauseCircle": {
    "tags": [
      "music",
      "audio",
      "stop"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "Pause",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "XCircle"
    ]
  },
  "Pause": {
    "tags": [
      "music",
      "stop"
    ],
    "more": [
      "PauseCircle"
    ]
  },
  "PenTool": {
    "tags": [
      "vector",
      "drawing"
    ],
    "more": [
      "Figma",
      "Framer",
      "Tool"
    ]
  },
  "Percent": {
    "tags": [
      "discount"
    ],
    "more": []
  },
  "PhoneCall": {
    "tags": [
      "ring"
    ],
    "more": [
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOff",
      "PhoneOutgoing",
      "Phone",
      "Voicemail"
    ]
  },
  "PhoneForwarded": {
    "tags": [
      "call"
    ],
    "more": [
      "PhoneCall",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOff",
      "PhoneOutgoing",
      "Phone",
      "Voicemail"
    ]
  },
  "PhoneIncoming": {
    "tags": [
      "call"
    ],
    "more": [
      "PhoneCall",
      "PhoneForwarded",
      "PhoneMissed",
      "PhoneOff",
      "PhoneOutgoing",
      "Phone",
      "Voicemail"
    ]
  },
  "PhoneMissed": {
    "tags": [
      "call"
    ],
    "more": [
      "PhoneCall",
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneOff",
      "PhoneOutgoing",
      "Phone",
      "Voicemail"
    ]
  },
  "PhoneOff": {
    "tags": [
      "call",
      "mute"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "MicOff",
      "PhoneCall",
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOutgoing",
      "Phone",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "Voicemail",
      "WifiOff",
      "ZapOff"
    ]
  },
  "PhoneOutgoing": {
    "tags": [
      "call"
    ],
    "more": [
      "PhoneCall",
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOff",
      "Phone",
      "Voicemail"
    ]
  },
  "Phone": {
    "tags": [
      "call"
    ],
    "more": [
      "PhoneCall",
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOff",
      "PhoneOutgoing",
      "Voicemail"
    ]
  },
  "PieChart": {
    "tags": [
      "statistics",
      "diagram"
    ],
    "more": [
      "BarChart",
      "BarChart2"
    ]
  },
  "PlayCircle": {
    "tags": [
      "music",
      "start"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "Play",
      "PlusCircle",
      "StopCircle",
      "XCircle",
      "Youtube"
    ]
  },
  "Play": {
    "tags": [
      "music",
      "start"
    ],
    "more": [
      "PlayCircle",
      "Youtube"
    ]
  },
  "PlusCircle": {
    "tags": [
      "add",
      "new"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "FilePlus",
      "FolderPlus",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "Plus",
      "PlusSquare",
      "StopCircle",
      "UserPlus",
      "XCircle"
    ]
  },
  "PlusSquare": {
    "tags": [
      "add",
      "new"
    ],
    "more": [
      "FilePlus",
      "FolderPlus",
      "MessageSquare",
      "Plus",
      "PlusCircle",
      "UserPlus",
      "XSquare"
    ]
  },
  "Plus": {
    "tags": [
      "add",
      "new"
    ],
    "more": [
      "FilePlus",
      "FolderPlus",
      "PlusCircle",
      "PlusSquare",
      "UserPlus"
    ]
  },
  "Pocket": {
    "tags": [
      "logo",
      "save"
    ],
    "more": []
  },
  "Power": {
    "tags": [
      "on",
      "off"
    ],
    "more": [
      "Battery",
      "BatteryCharging"
    ]
  },
  "Printer": {
    "tags": [
      "fax",
      "office",
      "device"
    ],
    "more": []
  },
  "Radio": {
    "tags": [
      "signal"
    ],
    "more": []
  },
  "RefreshCcw": {
    "tags": [
      "arrows"
    ],
    "more": [
      "RefreshCw",
      "RotateCcw"
    ]
  },
  "RefreshCw": {
    "tags": [
      "synchronise",
      "arrows"
    ],
    "more": [
      "RefreshCcw",
      "RotateCw"
    ]
  },
  "Repeat": {
    "tags": [
      "loop",
      "arrows"
    ],
    "more": []
  },
  "Rewind": {
    "tags": [
      "music"
    ],
    "more": []
  },
  "RotateCcw": {
    "tags": [
      "arrow"
    ],
    "more": [
      "RefreshCcw",
      "RotateCw"
    ]
  },
  "RotateCw": {
    "tags": [
      "arrow"
    ],
    "more": [
      "RefreshCw",
      "RotateCcw"
    ]
  },
  "Rss": {
    "tags": [
      "feed",
      "subscribe"
    ],
    "more": []
  },
  "Save": {
    "tags": [
      "floppy disk"
    ],
    "more": [
      "Pocket"
    ]
  },
  "Scissors": {
    "tags": [
      "cut"
    ],
    "more": []
  },
  "Search": {
    "tags": [
      "find",
      "magnifier",
      "magnifying glass"
    ],
    "more": []
  },
  "Send": {
    "tags": [
      "message",
      "mail",
      "email",
      "paper airplane",
      "paper aeroplane"
    ],
    "more": []
  },
  "Server": {
    "tags": [],
    "more": [
      "HardDrive"
    ]
  },
  "Settings": {
    "tags": [
      "cog",
      "edit",
      "gear",
      "preferences"
    ],
    "more": [
      "Sliders",
      "Tool"
    ]
  },
  "Share2": {
    "tags": [
      "network",
      "connections"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Trash2",
      "Volume2"
    ]
  },
  "Share": {
    "tags": [],
    "more": [
      "Share2"
    ]
  },
  "ShieldOff": {
    "tags": [
      "security",
      "insecure"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "Power",
      "Shield",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "Shield": {
    "tags": [
      "security",
      "secure"
    ],
    "more": [
      "ShieldOff"
    ]
  },
  "ShoppingBag": {
    "tags": [
      "ecommerce",
      "cart",
      "purchase",
      "store"
    ],
    "more": [
      "Briefcase",
      "ShoppingCart"
    ]
  },
  "ShoppingCart": {
    "tags": [
      "ecommerce",
      "cart",
      "purchase",
      "store"
    ],
    "more": [
      "ShoppingBag"
    ]
  },
  "Shuffle": {
    "tags": [
      "music"
    ],
    "more": []
  },
  "Sidebar": {
    "tags": [],
    "more": []
  },
  "SkipBack": {
    "tags": [
      "music"
    ],
    "more": [
      "SkipForward"
    ]
  },
  "SkipForward": {
    "tags": [
      "music"
    ],
    "more": [
      "FastForward",
      "SkipBack"
    ]
  },
  "Slack": {
    "tags": [
      "logo"
    ],
    "more": []
  },
  "Slash": {
    "tags": [
      "ban",
      "no"
    ],
    "more": []
  },
  "Sliders": {
    "tags": [
      "settings",
      "controls"
    ],
    "more": []
  },
  "Smartphone": {
    "tags": [
      "cellphone",
      "device"
    ],
    "more": []
  },
  "Smile": {
    "tags": [
      "emoji",
      "face",
      "happy",
      "good",
      "emotion"
    ],
    "more": []
  },
  "Speaker": {
    "tags": [
      "audio",
      "music"
    ],
    "more": []
  },
  "Square": {
    "tags": [],
    "more": [
      "MessageSquare",
      "PlusSquare",
      "XSquare"
    ]
  },
  "Star": {
    "tags": [
      "bookmark",
      "favorite",
      "like"
    ],
    "more": []
  },
  "StopCircle": {
    "tags": [
      "media",
      "music"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "Octagon",
      "Pause",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "XCircle",
      "XOctagon"
    ]
  },
  "Sun": {
    "tags": [
      "brightness",
      "weather",
      "light"
    ],
    "more": []
  },
  "Sunrise": {
    "tags": [
      "weather",
      "time",
      "morning",
      "day"
    ],
    "more": []
  },
  "Sunset": {
    "tags": [
      "weather",
      "time",
      "evening",
      "night"
    ],
    "more": []
  },
  "Table": {
    "tags": [],
    "more": []
  },
  "Tablet": {
    "tags": [
      "device"
    ],
    "more": []
  },
  "Tag": {
    "tags": [
      "label"
    ],
    "more": [
      "Bookmark"
    ]
  },
  "Target": {
    "tags": [
      "logo",
      "bullseye"
    ],
    "more": [
      "Crosshair"
    ]
  },
  "Terminal": {
    "tags": [
      "code",
      "command line",
      "prompt"
    ],
    "more": [
      "Command"
    ]
  },
  "Thermometer": {
    "tags": [
      "temperature",
      "celsius",
      "fahrenheit",
      "weather"
    ],
    "more": []
  },
  "ThumbsDown": {
    "tags": [
      "dislike",
      "bad",
      "emotion"
    ],
    "more": [
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerRightDown",
      "ThumbsUp"
    ]
  },
  "ThumbsUp": {
    "tags": [
      "like",
      "good",
      "emotion"
    ],
    "more": [
      "ChevronUp",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsDown"
    ]
  },
  "ToggleLeft": {
    "tags": [
      "on",
      "off",
      "switch"
    ],
    "more": [
      "AlignLeft",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "ToggleRight"
    ]
  },
  "ToggleRight": {
    "tags": [
      "on",
      "off",
      "switch"
    ],
    "more": [
      "AlignRight",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "ToggleLeft"
    ]
  },
  "Tool": {
    "tags": [
      "settings",
      "spanner"
    ],
    "more": [
      "Figma",
      "Framer",
      "PenTool"
    ]
  },
  "Trash2": {
    "tags": [
      "garbage",
      "delete",
      "remove",
      "bin"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Share2",
      "Trash",
      "Volume2"
    ]
  },
  "Trash": {
    "tags": [
      "garbage",
      "delete",
      "remove",
      "bin"
    ],
    "more": [
      "Trash2"
    ]
  },
  "Trello": {
    "tags": [],
    "more": []
  },
  "TrendingDown": {
    "tags": [],
    "more": [
      "ChevronDown",
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerRightDown",
      "ThumbsDown"
    ]
  },
  "TrendingUp": {
    "tags": [],
    "more": [
      "ChevronUp",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp"
    ]
  },
  "Triangle": {
    "tags": [
      "delta"
    ],
    "more": [
      "AlertTriangle"
    ]
  },
  "Truck": {
    "tags": [
      "delivery",
      "van",
      "shipping",
      "transport",
      "lorry"
    ],
    "more": []
  },
  "Tv": {
    "tags": [
      "television",
      "stream"
    ],
    "more": [
      "Monitor"
    ]
  },
  "Twitch": {
    "tags": [
      "logo"
    ],
    "more": []
  },
  "Twitter": {
    "tags": [
      "logo",
      "social"
    ],
    "more": []
  },
  "Type": {
    "tags": [
      "text"
    ],
    "more": []
  },
  "Umbrella": {
    "tags": [
      "rain",
      "weather"
    ],
    "more": []
  },
  "Underline": {
    "tags": [],
    "more": []
  },
  "Unlock": {
    "tags": [
      "security"
    ],
    "more": []
  },
  "UploadCloud": {
    "tags": [],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud"
    ]
  },
  "Upload": {
    "tags": [],
    "more": []
  },
  "UserCheck": {
    "tags": [
      "followed",
      "subscribed"
    ],
    "more": [
      "UserMinus",
      "UserPlus",
      "UserX",
      "User"
    ]
  },
  "UserMinus": {
    "tags": [
      "delete",
      "remove",
      "unfollow",
      "unsubscribe"
    ],
    "more": [
      "FileMinus",
      "FolderMinus",
      "Minus",
      "UserCheck",
      "UserPlus",
      "UserX",
      "User"
    ]
  },
  "UserPlus": {
    "tags": [
      "new",
      "add",
      "create",
      "follow",
      "subscribe"
    ],
    "more": [
      "FilePlus",
      "FolderPlus",
      "Plus",
      "PlusCircle",
      "PlusSquare",
      "UserCheck",
      "UserMinus",
      "UserX",
      "User"
    ]
  },
  "UserX": {
    "tags": [
      "delete",
      "remove",
      "unfollow",
      "unsubscribe",
      "unavailable"
    ],
    "more": [
      "UserCheck",
      "UserMinus",
      "UserPlus",
      "User",
      "VolumeX",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
    ]
  },
  "User": {
    "tags": [
      "person",
      "account"
    ],
    "more": [
      "UserCheck",
      "UserMinus",
      "UserPlus",
      "UserX"
    ]
  },
  "Users": {
    "tags": [
      "group"
    ],
    "more": []
  },
  "VideoOff": {
    "tags": [
      "camera",
      "movie",
      "film"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "Film",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "Video",
      "WifiOff",
      "Youtube",
      "ZapOff"
    ]
  },
  "Video": {
    "tags": [
      "camera",
      "movie",
      "film"
    ],
    "more": [
      "Film",
      "VideoOff",
      "Youtube"
    ]
  },
  "Voicemail": {
    "tags": [
      "phone"
    ],
    "more": []
  },
  "Volume1": {
    "tags": [
      "music",
      "sound"
    ],
    "more": [
      "Volume",
      "Volume2",
      "VolumeX"
    ]
  },
  "Volume2": {
    "tags": [
      "music",
      "sound"
    ],
    "more": [
      "BarChart2",
      "Edit2",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Share2",
      "Trash2",
      "Volume",
      "Volume1",
      "VolumeX"
    ]
  },
  "VolumeX": {
    "tags": [
      "music",
      "sound",
      "mute"
    ],
    "more": [
      "UserX",
      "Volume",
      "Volume1",
      "Volume2",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
    ]
  },
  "Volume": {
    "tags": [
      "music",
      "sound",
      "mute"
    ],
    "more": [
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
  },
  "Watch": {
    "tags": [
      "clock",
      "time"
    ],
    "more": [
      "Clock",
      "Eye",
      "EyeOff"
    ]
  },
  "WifiOff": {
    "tags": [
      "disabled"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "Wifi",
      "ZapOff"
    ]
  },
  "Wifi": {
    "tags": [
      "connection",
      "signal",
      "wireless"
    ],
    "more": [
      "WifiOff"
    ]
  },
  "Wind": {
    "tags": [
      "weather",
      "air"
    ],
    "more": []
  },
  "XCircle": {
    "tags": [
      "cancel",
      "close",
      "delete",
      "remove",
      "times",
      "clear"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "UserX",
      "VolumeX",
      "XOctagon",
      "XSquare",
      "X"
    ]
  },
  "XOctagon": {
    "tags": [
      "delete",
      "stop",
      "alert",
      "warning",
      "times",
      "clear"
    ],
    "more": [
      "AlertOctagon",
      "Octagon",
      "UserX",
      "VolumeX",
      "XCircle",
      "XSquare",
      "X"
    ]
  },
  "XSquare": {
    "tags": [
      "cancel",
      "close",
      "delete",
      "remove",
      "times",
      "clear"
    ],
    "more": [
      "MessageSquare",
      "PlusSquare",
      "UserX",
      "VolumeX",
      "XCircle",
      "XOctagon",
      "X"
    ]
  },
  "X": {
    "tags": [
      "cancel",
      "close",
      "delete",
      "remove",
      "times",
      "clear"
    ],
    "more": [
      "UserX",
      "VolumeX",
      "XCircle",
      "XOctagon",
      "XSquare"
    ]
  },
  "Youtube": {
    "tags": [
      "logo",
      "video",
      "play"
    ],
    "more": []
  },
  "ZapOff": {
    "tags": [
      "flash",
      "camera",
      "lightning"
    ],
    "more": [
      "BellOff",
      "Circle",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "Power",
      "ShieldOff",
      "ToggleLeft",
      "ToggleRight",
      "VideoOff",
      "WifiOff",
      "Zap"
    ]
  },
  "Zap": {
    "tags": [
      "flash",
      "camera",
      "lightning"
    ],
    "more": [
      "ZapOff"
    ]
  },
  "ZoomIn": {
    "tags": [
      "magnifying glass"
    ],
    "more": [
      "LogIn",
      "ZoomOut"
    ]
  },
  "ZoomOut": {
    "tags": [
      "magnifying glass"
    ],
    "more": [
      "LogOut",
      "ZoomIn"
    ]
  }
}
