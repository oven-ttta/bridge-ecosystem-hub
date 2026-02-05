import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] py-12 px-4 pt-28">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
        </Button>

        <div className="bg-card rounded-2xl border border-border/50 shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Legal
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              เงื่อนไขการใช้งาน
            </h1>
            <p className="text-muted-foreground">
              ปรับปรุงล่าสุด: 1 มกราคม 2568
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. ข้อตกลงทั่วไป
              </h2>
              <p>
                เงื่อนไขการใช้งานฉบับนี้ (&quot;เงื่อนไข&quot;) เป็นข้อตกลงระหว่างท่านกับ
                สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) หรือ สขญ. (&quot;เรา&quot; หรือ &quot;BDI&quot;)
                เกี่ยวกับการใช้งานแพลตฟอร์ม BRIDGE Ecosystem Platform (&quot;บริการ&quot;)
                การเข้าใช้งานบริการถือว่าท่านยอมรับเงื่อนไขทั้งหมดนี้
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. คุณสมบัติผู้ใช้งาน
              </h2>
              <p>
                ผู้ใช้งานต้องเป็นนิติบุคคลหรือบุคคลธรรมดาที่จดทะเบียนถูกต้องตามกฎหมายไทย
                และมีความเกี่ยวข้องกับอุตสาหกรรมเทคโนโลยี Big Data, AI หรือดิจิทัล
                ผู้ใช้งานต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันในการลงทะเบียน
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. การใช้งานบริการ
              </h2>
              <p>ท่านตกลงที่จะ:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>ใช้บริการเพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น</li>
                <li>ไม่กระทำการใดๆ ที่อาจทำให้ระบบหรือบริการเสียหาย</li>
                <li>รักษาความลับของข้อมูลบัญชีผู้ใช้งานของท่าน</li>
                <li>ไม่ใช้บริการเพื่อส่งข้อมูลที่ผิดกฎหมาย หลอกลวง หรือเป็นอันตราย</li>
                <li>ปฏิบัติตามนโยบายการใช้งานที่เรากำหนด</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. บัญชีผู้ใช้งาน
              </h2>
              <p>
                ท่านมีหน้าที่รักษาความปลอดภัยของบัญชีผู้ใช้งาน รวมถึงรหัสผ่านและข้อมูลการเข้าถึง
                ท่านต้องแจ้งให้เราทราบทันทีหากพบการใช้งานที่ไม่ได้รับอนุญาต
                เราไม่รับผิดชอบต่อความเสียหายที่เกิดจากการเข้าถึงบัญชีโดยไม่ได้รับอนุญาต
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. ทรัพย์สินทางปัญญา
              </h2>
              <p>
                เนื้อหา ซอฟต์แวร์ และทรัพย์สินทางปัญญาทั้งหมดบนแพลตฟอร์มเป็นของ สขญ.
                หรือผู้ให้อนุญาตที่เกี่ยวข้อง ห้ามทำซ้ำ ดัดแปลง เผยแพร่
                หรือใช้เพื่อการค้าโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. ทุนสนับสนุนและสัญญา
              </h2>
              <p>
                การยื่นขอทุนสนับสนุนผ่านแพลตฟอร์มอยู่ภายใต้เงื่อนไขเฉพาะของแต่ละโครงการ
                การอนุมัติทุนขึ้นอยู่กับดุลยพินิจของคณะกรรมการพิจารณา
                ผู้รับทุนต้องปฏิบัติตามเงื่อนไขของสัญญารับทุนอย่างเคร่งครัด
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. การจับคู่ธุรกิจ
              </h2>
              <p>
                ระบบจับคู่ธุรกิจเป็นเพียงเครื่องมือช่วยเหลือในการเชื่อมโยงผู้ประกอบการ
                เราไม่รับประกันผลลัพธ์ของการจับคู่หรือความสำเร็จทางธุรกิจ
                การตกลงทำธุรกิจร่วมกันเป็นความรับผิดชอบของคู่สัญญาเอง
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. การจำกัดความรับผิดชอบ
              </h2>
              <p>
                เราให้บริการแพลตฟอร์ม &quot;ตามสภาพ&quot; (as-is)
                โดยไม่รับประกันว่าบริการจะไม่หยุดชะงักหรือปราศจากข้อผิดพลาด
                เราจะไม่รับผิดชอบต่อความเสียหายทางอ้อม ความเสียหายพิเศษ
                หรือความเสียหายเชิงลงโทษที่เกิดจากการใช้บริการ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. การเปลี่ยนแปลงเงื่อนไข
              </h2>
              <p>
                เราอาจปรับปรุงเงื่อนไขการใช้งานเป็นครั้งคราว
                โดยจะแจ้งให้ท่านทราบผ่านทางอีเมลหรือประกาศบนแพลตฟอร์ม
                การใช้บริการต่อหลังจากมีการเปลี่ยนแปลงถือว่าท่านยอมรับเงื่อนไขใหม่
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. กฎหมายที่ใช้บังคับ
              </h2>
              <p>
                เงื่อนไขการใช้งานนี้อยู่ภายใต้กฎหมายแห่งราชอาณาจักรไทย
                ข้อพิพาทใดๆ ที่เกิดขึ้นจะอยู่ในเขตอำนาจศาลไทย
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. การติดต่อ
              </h2>
              <p>
                หากมีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้งาน สามารถติดต่อได้ที่:
              </p>
              <p className="mt-2">
                สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน)
                <br />
                อีเมล: contact@bdi.or.th
                <br />
                โทร: 02-xxx-xxxx
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
