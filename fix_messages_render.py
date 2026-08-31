import sys

def fix_messages():
    with open('src/pages/MessagesPage.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    
    for i, line in enumerate(lines):
        if "(m.content.startsWith(" in line and "dYs" in line:
            start_idx = i
        if start_idx != -1 and i > start_idx:
            if "<div className={group relative" in line:
                end_idx = i - 1
                break

    if start_idx == -1 or end_idx == -1:
        print("Could not find bounds")
        return

    replacement = '''                            {(() => {
                              const content = m.content;
                              const isSysLegacyCancel = content.startsWith("🚫") || content.startsWith("s,?") || content.startsWith("dYs ");
                              const isSysLegacyConfirm = content.startsWith("✅") || content.startsWith("o.");
                              const isSysLegacyDispute = content.startsWith("🚨") || content.startsWith("dYs\\\"") || content.startsWith("s-,?");
                              const isSysLegacyMM = content.startsWith("✅ Escrow");

                              const isSysCancel = content.startsWith("[SYS_CANCEL]") || isSysLegacyCancel;
                              const isSysConfirm = content.startsWith("[SYS_CONFIRM]") || isSysLegacyConfirm;
                              const isSysDispute = content.startsWith("[SYS_DISPUTE]") || isSysLegacyDispute;
                              const isSysMM = content.startsWith("[SYS_MM_ASSIGN]") || isSysLegacyMM;

                              if (isSysCancel || isSysConfirm || isSysDispute || isSysMM) {
                                let text = content
                                  .replace(/^\\[SYS_\\w+\\]\\s*/, "")
                                  .replace(/^(🚨|✅|🚫|dYs\\"|dYs |o\\.|s,\\?|s-,\\?)\\s*/, "")
                                  .trim();
                                
                                let IconComponent = ShieldIcon;
                                let colorClass = "bg-[#111113] text-[#93939f] border-[#222226]";
                                
                                if (isSysCancel) {
                                  IconComponent = BanIcon;
                                  colorClass = "bg-red-500/10 text-red-500 border-red-500/30";
                                } else if (isSysDispute) {
                                  IconComponent = AlertTriangleIcon;
                                  colorClass = "bg-amber-500/10 text-amber-500 border-amber-500/30";
                                } else if (isSysConfirm) {
                                  IconComponent = CheckCircleIcon;
                                  colorClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
                                }

                                return (
                                  <div className="my-3 flex justify-center">
                                    <div className={lex items-center gap-2 px-5 py-3 rounded-lg text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm border }>
                                      <IconComponent className="w-5 h-5 shrink-0" />
                                      <span>{text}</span>
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
'''
    new_lines = lines[:start_idx] + [replacement] + lines[end_idx+1:]
    
    with open('src/pages/MessagesPage.tsx', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        
    print("Done")

fix_messages()
