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
      "Tv"
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
    "more": [
      "Camera",
      "Crop",
      "Instagram",
      "VideoOff",
      "Video",
      "ZapOff",
      "Zap"
    ]
  },
  "Archive": {
    "tags": [
      "index",
      "box"
    ],
    "more": [
      "Gift",
      "Package"
    ]
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
      "CornerRightDown",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
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
      "CornerUpLeft",
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
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
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
      "CornerRightDown",
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
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
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
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "ToggleLeft"
    ]
  },
  "ArrowRightCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "AlignRight",
      "Circle",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "ToggleRight",
      "XCircle"
    ]
  },
  "ArrowRight": {
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
  "ArrowUpCircle": {
    "tags": [],
    "more": [
      "AlertCircle",
      "ChevronUp",
      "Circle",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "HelpCircle",
      "MessageCircle",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
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
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp",
      "ToggleLeft"
    ]
  },
  "ArrowUpRight": {
    "tags": [],
    "more": [
      "AlignRight",
      "ChevronUp",
      "CornerDownRight",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "ThumbsUp",
      "ToggleRight"
    ]
  },
  "ArrowUp": {
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
  "AtSign": {
    "tags": [
      "mention",
      "at",
      "email",
      "message"
    ],
    "more": [
      "DollarSign",
      "Inbox",
      "Mail",
      "Send"
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
      "Clock",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
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
      "BellOff",
      "Clock",
      "Headphones",
      "MicOff",
      "Mic",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
  },
  "Bluetooth": {
    "tags": [
      "wireless"
    ],
    "more": [
      "Wifi"
    ]
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
      "Book",
      "Bookmark"
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
      "BookOpen",
      "Bookmark"
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
      "BookOpen",
      "Book",
      "MapPin"
    ]
  },
  "Box": {
    "tags": [
      "cube"
    ],
    "more": []
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
      "BellOff",
      "Camera",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
      "VideoOff",
      "WifiOff",
      "ZapOff"
    ]
  },
  "Camera": {
    "tags": [
      "photo"
    ],
    "more": [
      "Aperture",
      "Crop"
    ]
  },
  "Cast": {
    "tags": [
      "chromecast",
      "airplay"
    ],
    "more": []
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
      "Maximize2",
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
      "MicOff",
      "Mic",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "Power",
      "StopCircle",
      "ToggleLeft",
      "ToggleRight",
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
      "Bell",
      "BellOff",
      "Eye",
      "EyeOff",
      "Sunrise",
      "Sunset",
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
      "Cloud",
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
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
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
    ]
  },
  "CloudOff": {
    "tags": [],
    "more": [
      "BellOff",
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
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
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
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
      "Cloud",
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
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
      "CloudSnow",
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
    ]
  },
  "Code": {
    "tags": [
      "source",
      "programming"
    ],
    "more": []
  },
  "Codepen": {
    "tags": [
      "logo"
    ],
    "more": [
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "Codesandbox": {
    "tags": [
      "logo"
    ],
    "more": [
      "Codepen",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
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
    "more": [
      "Terminal"
    ]
  },
  "Compass": {
    "tags": [
      "navigation",
      "safari",
      "travel",
      "direction"
    ],
    "more": [
      "MapPin",
      "Map",
      "Menu",
      "Navigation",
      "Navigation2"
    ]
  },
  "Copy": {
    "tags": [
      "clone",
      "duplicate"
    ],
    "more": []
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "LogIn",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
    "more": [
      "DollarSign",
      "ShoppingBag",
      "ShoppingCart"
    ]
  },
  "Crop": {
    "tags": [
      "photo",
      "image"
    ],
    "more": [
      "Aperture",
      "Camera"
    ]
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
    "more": [
      "HardDrive"
    ]
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
    "more": [
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
      "AtSign",
      "CreditCard"
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
      "Edit2"
    ]
  },
  "Edit": {
    "tags": [
      "pencil",
      "change"
    ],
    "more": [
      "Edit2",
      "Edit3"
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
      "Clock",
      "Eye",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
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
      "Clock",
      "EyeOff"
    ]
  },
  "Facebook": {
    "tags": [
      "logo",
      "social"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "FastForward": {
    "tags": [
      "music"
    ],
    "more": [
      "Disc",
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "FileMinus": {
    "tags": [
      "delete",
      "remove",
      "erase"
    ],
    "more": [
      "Delete",
      "FilePlus",
      "FileText",
      "FolderMinus",
      "Minus",
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
      "HardDrive"
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
      "Video",
      "Youtube"
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "Frown": {
    "tags": [
      "emoji",
      "face",
      "bad",
      "sad",
      "emotion"
    ],
    "more": [
      "Heart",
      "Meh",
      "Smile",
      "ThumbsDown",
      "ThumbsUp"
    ]
  },
  "Gift": {
    "tags": [
      "present",
      "box",
      "birthday",
      "party"
    ],
    "more": [
      "Archive",
      "Package"
    ]
  },
  "GitBranch": {
    "tags": [
      "code",
      "version control"
    ],
    "more": [
      "GitCommit",
      "GitMerge",
      "GitPullRequest",
      "Github",
      "Gitlab",
      "Terminal"
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
      "GitPullRequest",
      "Github",
      "Gitlab",
      "Terminal"
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
      "GitPullRequest",
      "Github",
      "Gitlab",
      "Terminal"
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
      "GitMerge",
      "Github",
      "Gitlab",
      "Terminal"
    ]
  },
  "Github": {
    "tags": [
      "logo",
      "version control"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "GitBranch",
      "GitCommit",
      "GitMerge",
      "GitPullRequest",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "Gitlab": {
    "tags": [
      "logo",
      "version control"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "GitBranch",
      "GitCommit",
      "GitMerge",
      "GitPullRequest",
      "Github",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
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
    "more": [
      "Database",
      "FileText"
    ]
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
    "more": [
      "Bell",
      "Disc",
      "FastForward",
      "MicOff",
      "Mic",
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
  "Heart": {
    "tags": [
      "like",
      "love",
      "emotion"
    ],
    "more": [
      "Frown",
      "Meh",
      "Smile",
      "Star",
      "ThumbsDown",
      "ThumbsUp"
    ]
  },
  "HelpCircle": {
    "tags": [
      "question mark"
    ],
    "more": [
      "AlertCircle",
      "Circle",
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
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
    "more": []
  },
  "Inbox": {
    "tags": [
      "email"
    ],
    "more": [
      "AtSign",
      "Mail",
      "Send"
    ]
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
    "more": [
      "Aperture",
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "VideoOff",
      "Video",
      "Youtube",
      "ZapOff",
      "Zap"
    ]
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
    "more": [
      "Lock",
      "Shield"
    ]
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
    "more": []
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
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
    "more": [
      "Key",
      "Shield",
      "ShieldOff",
      "Unlock"
    ]
  },
  "LogIn": {
    "tags": [
      "sign in",
      "arrow",
      "enter"
    ],
    "more": [
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogOut",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
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
      "CornerDownLeft",
      "CornerDownRight",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpLeft",
      "CornerUpRight",
      "LogIn",
      "MousePointer",
      "RotateCcw",
      "RotateCw",
      "ZoomOut"
    ]
  },
  "Mail": {
    "tags": [
      "email",
      "message"
    ],
    "more": [
      "AtSign",
      "Inbox",
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
      "Bookmark",
      "Compass",
      "Map",
      "Menu",
      "Navigation",
      "Navigation2"
    ]
  },
  "Map": {
    "tags": [
      "location",
      "navigation",
      "travel"
    ],
    "more": [
      "Compass",
      "MapPin",
      "Menu",
      "Navigation",
      "Navigation2"
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
      "ChevronDown",
      "Edit2",
      "Link2",
      "Maximize",
      "Minimize2",
      "Move",
      "Navigation2",
      "RefreshCw",
      "RefreshCcw",
      "Repeat",
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
    "more": [
      "Frown",
      "Heart",
      "Smile",
      "ThumbsDown",
      "ThumbsUp"
    ]
  },
  "Menu": {
    "tags": [
      "bars",
      "navigation",
      "hamburger"
    ],
    "more": [
      "Compass",
      "MapPin",
      "Map"
    ]
  },
  "MessageCircle": {
    "tags": [
      "comment",
      "chat"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "HelpCircle",
      "MessageSquare",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
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
      "MessageCircle",
      "PlusSquare",
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
      "Bell",
      "BellOff",
      "Circle",
      "EyeOff",
      "Headphones",
      "Mic",
      "PhoneOff",
      "ShieldOff",
      "VideoOff",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX",
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
      "Bell",
      "Circle",
      "Headphones",
      "MicOff",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
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
      "Move",
      "Navigation2",
      "RefreshCw",
      "RefreshCcw",
      "Repeat",
      "Share2",
      "Trash2",
      "Volume2",
      "XCircle",
      "XSquare",
      "X"
    ]
  },
  "Minimize": {
    "tags": [
      "exit fullscreen",
      "close"
    ],
    "more": [
      "Minimize2",
      "XCircle",
      "XSquare",
      "X"
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
    "more": [
      "Sunset"
    ]
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
    "more": [
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
      "RotateCcw",
      "RotateCw"
    ]
  },
  "Move": {
    "tags": [
      "arrows"
    ],
    "more": [
      "Maximize2",
      "Minimize2",
      "RefreshCw",
      "RefreshCcw",
      "Repeat"
    ]
  },
  "Music": {
    "tags": [
      "note"
    ],
    "more": []
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
      "Navigation2"
    ]
  },
  "Octagon": {
    "tags": [
      "stop"
    ],
    "more": [
      "AlertOctagon",
      "Pause",
      "PauseCircle",
      "XOctagon"
    ]
  },
  "Package": {
    "tags": [
      "box",
      "container"
    ],
    "more": [
      "Archive",
      "Gift"
    ]
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
      "Disc",
      "FastForward",
      "Headphones",
      "HelpCircle",
      "MessageCircle",
      "Octagon",
      "Pause",
      "Play",
      "PlayCircle",
      "PlusCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX",
      "XCircle",
      "XOctagon"
    ]
  },
  "Pause": {
    "tags": [
      "music",
      "stop"
    ],
    "more": [
      "Disc",
      "FastForward",
      "Headphones",
      "Octagon",
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
      "VolumeX",
      "XOctagon"
    ]
  },
  "PenTool": {
    "tags": [
      "vector",
      "drawing"
    ],
    "more": [
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
      "Phone"
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
      "Phone"
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
      "Phone"
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
      "Phone"
    ]
  },
  "PhoneOff": {
    "tags": [
      "call",
      "mute"
    ],
    "more": [
      "BellOff",
      "EyeOff",
      "MicOff",
      "PhoneCall",
      "PhoneForwarded",
      "PhoneIncoming",
      "PhoneMissed",
      "PhoneOutgoing",
      "Phone",
      "ShieldOff",
      "VideoOff",
      "Volume",
      "VolumeX",
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
      "Phone"
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
      "PhoneOutgoing"
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
      "Disc",
      "FastForward",
      "Headphones",
      "HelpCircle",
      "MessageCircle",
      "Pause",
      "PauseCircle",
      "Play",
      "PlusCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX",
      "XCircle"
    ]
  },
  "Play": {
    "tags": [
      "music",
      "start"
    ],
    "more": [
      "Disc",
      "FastForward",
      "Headphones",
      "Pause",
      "PauseCircle",
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Slack",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "Power": {
    "tags": [
      "on",
      "off"
    ],
    "more": [
      "Circle",
      "ToggleLeft",
      "ToggleRight"
    ]
  },
  "Printer": {
    "tags": [
      "fax",
      "office",
      "device"
    ],
    "more": [
      "Smartphone",
      "Tablet"
    ]
  },
  "Radio": {
    "tags": [
      "signal"
    ],
    "more": [
      "Wifi"
    ]
  },
  "RefreshCcw": {
    "tags": [
      "arrows"
    ],
    "more": [
      "Maximize2",
      "Minimize2",
      "Move",
      "RefreshCw",
      "Repeat",
      "RotateCcw"
    ]
  },
  "RefreshCw": {
    "tags": [
      "synchronise",
      "arrows"
    ],
    "more": [
      "Maximize2",
      "Minimize2",
      "Move",
      "RefreshCcw",
      "Repeat",
      "RotateCw"
    ]
  },
  "Repeat": {
    "tags": [
      "loop",
      "arrows"
    ],
    "more": [
      "Maximize2",
      "Minimize2",
      "Move",
      "RefreshCw",
      "RefreshCcw"
    ]
  },
  "Rewind": {
    "tags": [
      "music"
    ],
    "more": [
      "Disc",
      "FastForward",
      "Headphones",
      "Pause",
      "PauseCircle",
      "Play",
      "PlayCircle",
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
  "RotateCcw": {
    "tags": [
      "arrow"
    ],
    "more": [
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
      "RefreshCcw",
      "RotateCw"
    ]
  },
  "RotateCw": {
    "tags": [
      "arrow"
    ],
    "more": [
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
      "RefreshCw",
      "RotateCcw"
    ]
  },
  "Rss": {
    "tags": [
      "feed",
      "subscribe"
    ],
    "more": [
      "UserPlus"
    ]
  },
  "Save": {
    "tags": [
      "floppy disk"
    ],
    "more": []
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
    "more": [
      "ZoomIn",
      "ZoomOut"
    ]
  },
  "Send": {
    "tags": [
      "message",
      "mail",
      "email",
      "paper airplane",
      "paper aeroplane"
    ],
    "more": [
      "AtSign",
      "Inbox",
      "Mail"
    ]
  },
  "Server": {
    "tags": [],
    "more": []
  },
  "Settings": {
    "tags": [
      "cog",
      "edit",
      "gear",
      "preferences"
    ],
    "more": []
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
      "EyeOff",
      "Lock",
      "MicOff",
      "PhoneOff",
      "Shield",
      "Unlock",
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
      "Key",
      "Lock",
      "ShieldOff",
      "Unlock"
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
      "CreditCard",
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
      "CreditCard",
      "ShoppingBag"
    ]
  },
  "Shuffle": {
    "tags": [
      "music"
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
  "Sidebar": {
    "tags": [],
    "more": []
  },
  "SkipBack": {
    "tags": [
      "music"
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
      "SkipForward",
      "Speaker",
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
  },
  "SkipForward": {
    "tags": [
      "music"
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
      "Speaker",
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
  },
  "Slack": {
    "tags": [
      "logo"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Target",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
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
    "more": [
      "Tool"
    ]
  },
  "Smartphone": {
    "tags": [
      "cellphone",
      "device"
    ],
    "more": [
      "Printer",
      "Tablet"
    ]
  },
  "Smile": {
    "tags": [
      "emoji",
      "face",
      "happy",
      "good",
      "emotion"
    ],
    "more": [
      "Frown",
      "Heart",
      "Meh",
      "ThumbsDown",
      "ThumbsUp"
    ]
  },
  "Speaker": {
    "tags": [
      "audio",
      "music"
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
      "StopCircle",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX"
    ]
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
    "more": [
      "Heart",
      "ThumbsUp"
    ]
  },
  "StopCircle": {
    "tags": [
      "media",
      "music"
    ],
    "more": [
      "AlertCircle",
      "Circle",
      "Disc",
      "FastForward",
      "Headphones",
      "HelpCircle",
      "MessageCircle",
      "Pause",
      "PauseCircle",
      "Play",
      "PlayCircle",
      "PlusCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "Volume",
      "Volume1",
      "Volume2",
      "VolumeX",
      "XCircle"
    ]
  },
  "Sun": {
    "tags": [
      "brightness",
      "weather",
      "light"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Wind"
    ]
  },
  "Sunrise": {
    "tags": [
      "weather",
      "time",
      "morning",
      "day"
    ],
    "more": [
      "Clock",
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Sun",
      "Sunset",
      "Thermometer",
      "Umbrella",
      "Watch",
      "Wind"
    ]
  },
  "Sunset": {
    "tags": [
      "weather",
      "time",
      "evening",
      "night"
    ],
    "more": [
      "Clock",
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Moon",
      "Sun",
      "Sunrise",
      "Thermometer",
      "Umbrella",
      "Watch",
      "Wind"
    ]
  },
  "Table": {
    "tags": [],
    "more": []
  },
  "Tablet": {
    "tags": [
      "device"
    ],
    "more": [
      "Printer",
      "Smartphone"
    ]
  },
  "Tag": {
    "tags": [
      "label"
    ],
    "more": []
  },
  "Target": {
    "tags": [
      "logo",
      "bullseye"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Twitch",
      "Twitter",
      "Youtube"
    ]
  },
  "Terminal": {
    "tags": [
      "code",
      "command line",
      "prompt"
    ],
    "more": [
      "Command",
      "GitBranch",
      "GitCommit",
      "GitMerge",
      "GitPullRequest"
    ]
  },
  "Thermometer": {
    "tags": [
      "temperature",
      "celsius",
      "fahrenheit",
      "weather"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Sun",
      "Sunrise",
      "Sunset",
      "Umbrella",
      "Wind"
    ]
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
      "Frown",
      "Heart",
      "Meh",
      "Smile",
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
      "Frown",
      "Heart",
      "Meh",
      "Smile",
      "Star",
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
      "Circle",
      "CornerDownLeft",
      "CornerLeftDown",
      "CornerLeftUp",
      "CornerUpLeft",
      "Power",
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
      "Circle",
      "CornerDownRight",
      "CornerRightDown",
      "CornerRightUp",
      "CornerUpRight",
      "Power",
      "ToggleLeft"
    ]
  },
  "Tool": {
    "tags": [
      "settings",
      "spanner"
    ],
    "more": [
      "PenTool",
      "Sliders"
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
      "Delete",
      "Edit2",
      "FileMinus",
      "Link2",
      "Maximize2",
      "Minimize2",
      "Navigation2",
      "Share2",
      "Trash",
      "UserMinus",
      "UserX",
      "Volume2",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
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
      "Delete",
      "FileMinus",
      "Trash2",
      "UserMinus",
      "UserX",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
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
      "Airplay"
    ]
  },
  "Twitch": {
    "tags": [
      "logo"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitter",
      "Youtube"
    ]
  },
  "Twitter": {
    "tags": [
      "logo",
      "social"
    ],
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Youtube"
    ]
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
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Wind"
    ]
  },
  "Underline": {
    "tags": [],
    "more": []
  },
  "Unlock": {
    "tags": [
      "security"
    ],
    "more": [
      "Lock",
      "Shield",
      "ShieldOff"
    ]
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
      "Delete",
      "FileMinus",
      "FolderMinus",
      "Minus",
      "Trash",
      "Trash2",
      "UserCheck",
      "UserPlus",
      "UserX",
      "User",
      "XCircle",
      "XOctagon",
      "XSquare",
      "X"
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
      "Rss",
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
      "Delete",
      "FileMinus",
      "Trash",
      "Trash2",
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
      "Aperture",
      "BellOff",
      "EyeOff",
      "Film",
      "Instagram",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
      "Video",
      "WifiOff",
      "ZapOff",
      "Zap"
    ]
  },
  "Video": {
    "tags": [
      "camera",
      "movie",
      "film"
    ],
    "more": [
      "Aperture",
      "Film",
      "Instagram",
      "VideoOff",
      "ZapOff",
      "Zap"
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
      "Bell",
      "Disc",
      "FastForward",
      "Headphones",
      "MicOff",
      "Mic",
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
      "Bell",
      "Disc",
      "Edit2",
      "FastForward",
      "Headphones",
      "Link2",
      "Maximize2",
      "MicOff",
      "Mic",
      "Minimize2",
      "Navigation2",
      "Pause",
      "PauseCircle",
      "Play",
      "PlayCircle",
      "Rewind",
      "Share2",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
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
      "Bell",
      "Disc",
      "FastForward",
      "Headphones",
      "MicOff",
      "Mic",
      "Pause",
      "PauseCircle",
      "PhoneOff",
      "Play",
      "PlayCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
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
      "Bell",
      "Disc",
      "FastForward",
      "Headphones",
      "MicOff",
      "Mic",
      "Pause",
      "PauseCircle",
      "PhoneOff",
      "Play",
      "PlayCircle",
      "Rewind",
      "Shuffle",
      "SkipBack",
      "SkipForward",
      "Speaker",
      "StopCircle",
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
      "Sunrise",
      "Sunset"
    ]
  },
  "WifiOff": {
    "tags": [
      "disabled"
    ],
    "more": [
      "BellOff",
      "EyeOff",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
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
      "Bluetooth",
      "Radio",
      "WifiOff"
    ]
  },
  "Wind": {
    "tags": [
      "weather",
      "air"
    ],
    "more": [
      "CloudDrizzle",
      "CloudLightning",
      "CloudRain",
      "CloudSnow",
      "Cloud",
      "Sun",
      "Sunrise",
      "Sunset",
      "Thermometer",
      "Umbrella"
    ]
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
      "Delete",
      "FileMinus",
      "HelpCircle",
      "MessageCircle",
      "Minimize",
      "Minimize2",
      "PauseCircle",
      "PlayCircle",
      "PlusCircle",
      "StopCircle",
      "Trash",
      "Trash2",
      "UserMinus",
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
      "AlertCircle",
      "AlertOctagon",
      "AlertTriangle",
      "FileMinus",
      "Octagon",
      "Pause",
      "PauseCircle",
      "Trash",
      "Trash2",
      "UserMinus",
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
      "Delete",
      "FileMinus",
      "MessageSquare",
      "Minimize",
      "Minimize2",
      "PlusSquare",
      "Trash",
      "Trash2",
      "UserMinus",
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
      "Delete",
      "FileMinus",
      "Minimize",
      "Minimize2",
      "Trash",
      "Trash2",
      "UserMinus",
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
    "more": [
      "Codepen",
      "Codesandbox",
      "Facebook",
      "Figma",
      "Film",
      "Framer",
      "Github",
      "Gitlab",
      "Hexagon",
      "Instagram",
      "Linkedin",
      "Pocket",
      "Slack",
      "Target",
      "Twitch",
      "Twitter"
    ]
  },
  "ZapOff": {
    "tags": [
      "flash",
      "camera",
      "lightning"
    ],
    "more": [
      "Aperture",
      "BellOff",
      "EyeOff",
      "Instagram",
      "MicOff",
      "PhoneOff",
      "ShieldOff",
      "VideoOff",
      "Video",
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
      "Aperture",
      "Instagram",
      "VideoOff",
      "Video",
      "ZapOff"
    ]
  },
  "ZoomIn": {
    "tags": [
      "magnifying glass"
    ],
    "more": [
      "LogIn",
      "Search",
      "ZoomOut"
    ]
  },
  "ZoomOut": {
    "tags": [
      "magnifying glass"
    ],
    "more": [
      "LogOut",
      "Search",
      "ZoomIn"
    ]
  }
}
