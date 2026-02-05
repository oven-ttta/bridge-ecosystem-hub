import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              PDPA Compliant
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-muted-foreground">
              ปรับปรุงล่าสุด: 1 มกราคม 2568
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. บทนำ
              </h2>
              <p>
                สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) หรือ สขญ. (&quot;เรา&quot;)
                ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน นโยบายความเป็นส่วนตัวฉบับนี้
                อธิบายวิธีการเก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของท่าน
                เมื่อท่านใช้บริการ BRIDGE Ecosystem Platform (&quot;แพลตฟอร์ม&quot;)
                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              <p>เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลดังต่อไปนี้:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong className="text-foreground">ข้อมูลการลงทะเบียน:</strong> ชื่อ-นามสกุล
                  อีเมล เบอร์โทรศัพท์ ตำแหน่งงาน ชื่อองค์กร ที่อยู่
                </li>
                <li>
                  <strong className="text-foreground">ข้อมูลองค์กร:</strong> เลขทะเบียนนิติบุคคล
                  ประเภทธุรกิจ ขนาดองค์กร ความเชี่ยวชาญ ผลงาน
                </li>
                <li>
                  <strong className="text-foreground">ข้อมูลการใช้งาน:</strong> ประวัติการเข้าสู่ระบบ
                  กิจกรรมบนแพลตฟอร์ม การใช้บริการต่างๆ
                </li>
                <li>
                  <strong className="text-foreground">ข้อมูลทางเทคนิค:</strong> IP Address
                  ประเภทเบราว์เซอร์ คุกกี้ ข้อมูลอุปกรณ์
                </li>
                <li>
                  <strong className="text-foreground">ข้อมูลการยืนยันตัวตน:</strong>{" "}
                  ข้อมูลจาก THAID หรือ Digital ID (หากใช้งาน)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. วัตถุประสงค์ในการใช้ข้อมูล
              </h2>
              <p>เราใช้ข้อมูลส่วนบุคคลเพื่อ:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>ให้บริการแพลตฟอร์มและจัดการบัญชีผู้ใช้</li>
                <li>ดำเนินการจับคู่ธุรกิจระหว่างผู้ประกอบการ</li>
                <li>บริหารจัดการกระบวนการขอทุนสนับสนุน</li>
                <li>ส่งข้อมูลข่าวสาร กิจกรรม และการแจ้งเตือนต่างๆ</li>
                <li>วิเคราะห์และจัดทำรายงานสถิติ (แบบไม่ระบุตัวตน)</li>
                <li>ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</li>
                <li>ป้องกันการฉ้อโกงและรักษาความปลอดภัย</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. ฐานทางกฎหมายในการประมวลผล
              </h2>
              <p>เราประมวลผลข้อมูลส่วนบุคคลภายใต้ฐานทางกฎหมาย ได้แก่:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong className="text-foreground">ความยินยอม:</strong>{" "}
                  ท่านให้ความยินยอมในการเก็บรวบรวมและใช้ข้อมูล
                </li>
                <li>
                  <strong className="text-foreground">การปฏิบัติตามสัญญา:</strong>{" "}
                  เพื่อให้บริการตามที่ท่านร้องขอ
                </li>
                <li>
                  <strong className="text-foreground">หน้าที่ตามกฎหมาย:</strong>{" "}
                  เพื่อปฏิบัติตามกฎหมายที่เกี่ยวข้อง
                </li>
                <li>
                  <strong className="text-foreground">ประโยชน์โดยชอบด้วยกฎหมาย:</strong>{" "}
                  เพื่อการดำเนินงานตามพันธกิจขององค์กร
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. การเปิดเผยข้อมูล
              </h2>
              <p>เราอาจเปิดเผยข้อมูลส่วนบุคคลให้แก่:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>ผู้ประกอบการในเครือข่ายที่ได้รับการจับคู่ (เฉพาะข้อมูลธุรกิจที่เปิดเผยได้)</li>
                <li>หน่วยงานภาครัฐที่เกี่ยวข้องกับการบริหารทุนสนับสนุน</li>
                <li>ผู้ให้บริการภายนอกที่ช่วยดำเนินงาน (ภายใต้ข้อตกลงการรักษาความลับ)</li>
                <li>หน่วยงานบังคับใช้กฎหมาย ตามที่กฎหมายกำหนด</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. ระยะเวลาเก็บรักษาข้อมูล
              </h2>
              <p>
                เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านตราบเท่าที่จำเป็นต่อการให้บริการ
                หรือตามที่กฎหมายกำหนด โดยทั่วไปจะเก็บรักษาไม่เกิน 5 ปี
                หลังจากท่านยุติการใช้บริการ
                เว้นแต่จะมีข้อกำหนดทางกฎหมายที่ต้องเก็บรักษานานกว่านั้น
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. สิทธิของเจ้าของข้อมูล
              </h2>
              <p>ภายใต้ PDPA ท่านมีสิทธิ:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>สิทธิในการเข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
                <li>สิทธิในการแก้ไขข้อมูลให้ถูกต้อง</li>
                <li>สิทธิในการลบข้อมูล</li>
                <li>สิทธิในการจำกัดการประมวลผลข้อมูล</li>
                <li>สิทธิในการขอให้โอนย้ายข้อมูล</li>
                <li>สิทธิในการคัดค้านการประมวลผลข้อมูล</li>
                <li>สิทธิในการถอนความยินยอม</li>
              </ul>
              <p className="mt-2">
                ท่านสามารถใช้สิทธิดังกล่าวได้โดยติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                ผ่านช่องทางที่ระบุไว้ด้านล่าง
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. การรักษาความปลอดภัย
              </h2>
              <p>
                เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่าน
                จากการเข้าถึงโดยไม่ได้รับอนุญาต การสูญหาย การเปลี่ยนแปลง หรือการเปิดเผย
                รวมถึงการเข้ารหัสข้อมูล การควบคุมการเข้าถึง
                และการตรวจสอบความปลอดภัยอย่างสม่ำเสมอ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. คุกกี้
              </h2>
              <p>
                เราใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงเพื่อปรับปรุงประสบการณ์การใช้งาน
                ท่านสามารถจัดการการตั้งค่าคุกกี้ผ่านเบราว์เซอร์ของท่าน
                แต่การปิดใช้งานคุกกี้บางประเภทอาจส่งผลต่อการทำงานของบริการ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. การเปลี่ยนแปลงนโยบาย
              </h2>
              <p>
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวเป็นครั้งคราว
                การเปลี่ยนแปลงจะมีผลเมื่อเผยแพร่บนแพลตฟอร์ม
                เราจะแจ้งให้ท่านทราบเกี่ยวกับการเปลี่ยนแปลงที่สำคัญ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)
              </h2>
              <p>
                หากมีข้อสงสัยหรือต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคล
                สามารถติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลได้ที่:
              </p>
              <p className="mt-2">
                สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน)
                <br />
                เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)
                <br />
                อีเมล: dpo@bdi.or.th
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
